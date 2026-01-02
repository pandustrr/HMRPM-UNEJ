<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DivisionMember;
use App\Models\Division;
use App\Models\Period;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DivisionMemberController extends Controller
{
    public function index(Request $request)
    {
        $periods = Period::orderBy('created_at', 'desc')->get();
        $selectedPeriodId = $request->query('period_id');
        $selectedDivisionId = $request->query('division_id');
        $search = $request->query('search');

        if (!$selectedPeriodId) {
            $activePeriod = $periods->firstWhere('is_active', true) ?? $periods->first();
            $selectedPeriodId = $activePeriod ? $activePeriod->id : null;
        }

        // Get divisions for selected period
        $divisions = [];
        if ($selectedPeriodId) {
            $divisions = Division::where('period_id', $selectedPeriodId)->get();
        }

        // Build query for members
        $membersQuery = DivisionMember::with('division');

        if ($selectedDivisionId) {
            $membersQuery->where('division_id', $selectedDivisionId);
        } elseif ($selectedPeriodId) {
            $membersQuery->whereHas('division', function ($q) use ($selectedPeriodId) {
                $q->where('period_id', $selectedPeriodId);
            });
        }

        if ($search) {
            $membersQuery->where('name', 'like', "%{$search}%");
        }

        $members = $membersQuery->orderBy('name')->get();

        return Inertia::render('Admin/Members/Index-Member', [
            'periods' => $periods,
            'divisions' => $divisions,
            'members' => $members,
            'selectedPeriodId' => (int)$selectedPeriodId,
            'selectedDivisionId' => $selectedDivisionId ? (int)$selectedDivisionId : null,
            'search' => $search
        ]);
    }

    public function create(Request $request)
    {
        $periods = Period::with('divisions')->orderBy('created_at', 'desc')->get();
        $divisionId = $request->query('division_id');
        $periodId = $request->query('period_id');

        $prefill = [
            'division_id' => $divisionId,
            'period_id' => $periodId,
        ];

        if ($divisionId) {
            $division = Division::find($divisionId);
            if ($division) $prefill['division_name'] = $division->name;
        }

        if ($periodId) {
            $period = Period::find($periodId);
            if ($period) $prefill['period_year'] = $period->year;
        }

        return Inertia::render('Admin/Members/Create-Member', [
            'periods' => $periods,
            'prefill' => $prefill,
            'filter_division_id' => $request->query('filter_division_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'division_id' => 'required|exists:divisions,id',
            'name' => 'required|string',
            'role' => 'required|string',
            'prodi' => 'nullable|string',
            'angkatan' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'instagram' => 'nullable|url',
            'email' => 'nullable|email',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('members/photos', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('members/videos', 'public');
            $validated['video'] = '/storage/' . $path;
        }

        DivisionMember::create($validated);

        // Jika datang dari Edit Division, redirect ke Edit Division
        if ($request->division_id_source) {
            return redirect()->route('admin.divisions.edit', $request->division_id_source)
                ->with('success', 'Anggota berhasil ditambahkan.');
        }

        // Jika tidak, redirect ke Kelola Divisi & Pengurus dengan show_all_members
        return redirect()->route('admin.divisions.index', [
            'period_id' => $request->period_id,
            'show_all_members' => 1
        ])->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function show(DivisionMember $member)
    {
        return response()->json($member->load('division.period'));
    }

    public function edit(DivisionMember $member)
    {
        $member->load('division.period');
        $periods = Period::with('divisions')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Members/Edit-Member', [
            'member' => $member,
            'periods' => $periods,
            'filter_division_id' => request()->query('filter_division_id'),
        ]);
    }

    public function update(Request $request, DivisionMember $member)
    {
        $validated = $request->validate([
            'division_id' => 'required|exists:divisions,id',
            'name' => 'required|string',
            'role' => 'required|string',
            'prodi' => 'nullable|string',
            'angkatan' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'instagram' => 'nullable|url',
            'email' => 'nullable|email',
        ]);

        // Only update photo/video if new ones are uploaded
        if ($request->hasFile('photo')) {
            // Never delete the default logo
            if ($member->photo && !str_contains($member->photo, '/logo/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
            }
            $path = $request->file('photo')->store('members/photos', 'public');
            $validated['photo'] = '/storage/' . $path;
        } else {
            unset($validated['photo']);
        }

        if ($request->hasFile('video')) {
            if ($member->video && !str_contains($member->video, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->video));
            }
            $path = $request->file('video')->store('members/videos', 'public');
            $validated['video'] = '/storage/' . $path;
        } else {
            unset($validated['video']);
        }

        $member->update($validated);

        // Jika datang dari Edit Division, redirect ke Edit Division
        if ($request->division_id_source) {
            return redirect()->route('admin.divisions.edit', $request->division_id_source)
                ->with('success', 'Anggota berhasil diperbarui.');
        }

        // Jika tidak, redirect ke Kelola Divisi & Pengurus dengan show_all_members
        return redirect()->route('admin.divisions.index', [
            'period_id' => $request->period_id,
            'show_all_members' => 1
        ])->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(DivisionMember $member)
    {
        if ($member->photo) Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
        if ($member->video) Storage::disk('public')->delete(str_replace('/storage/', '', $member->video));

        $member->delete();

        return redirect()->back()->with('success', 'Anggota berhasil dihapus.');
    }
}

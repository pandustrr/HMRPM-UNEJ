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
        $periods = Period::orderBy('year', 'desc')->get();
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
        $periods = Period::with('divisions')->orderBy('year', 'desc')->get();
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
            'prefill' => $prefill
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
            'linkedin' => 'nullable|url',
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

        return redirect()->back()->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function show(DivisionMember $member)
    {
        return response()->json($member->load('division.period'));
    }

    public function edit(DivisionMember $member)
    {
        $member->load('division.period');
        $periods = Period::with('divisions')->orderBy('year', 'desc')->get();
        return Inertia::render('Admin/Members/Edit-Member', [
            'member' => $member,
            'periods' => $periods,
        ]);
    }

    public function update(Request $request, DivisionMember $member)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'prodi' => 'nullable|string',
            'angkatan' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'instagram' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'email' => 'nullable|email',
        ]);

        if ($request->hasFile('photo')) {
            if ($member->photo) Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
            $path = $request->file('photo')->store('members/photos', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            if ($member->video) Storage::disk('public')->delete(str_replace('/storage/', '', $member->video));
            $path = $request->file('video')->store('members/videos', 'public');
            $validated['video'] = '/storage/' . $path;
        }

        $member->update($validated);

        return redirect()->back()->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(DivisionMember $member)
    {
        if ($member->photo) Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
        if ($member->video) Storage::disk('public')->delete(str_replace('/storage/', '', $member->video));

        $member->delete();

        return redirect()->back()->with('success', 'Anggota berhasil dihapus.');
    }
}

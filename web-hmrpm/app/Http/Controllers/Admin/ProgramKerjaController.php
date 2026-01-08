<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramKerja;
use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramKerjaController extends Controller
{
    public function index(Request $request)
    {
        $query = ProgramKerja::with('division');

        if ($request->has('division_id') && $request->division_id) {
            $query->where('division_id', $request->division_id);
        }

        $programKerjas = $query->orderBy('event_date', 'desc')->get();
        $divisions = Division::orderBy('name')->get();

        return Inertia::render('Admin/Proker/Index-ProgramKerja', [
            'programKerjas' => $programKerjas,
            'divisions' => $divisions,
            'selectedDivisionId' => $request->division_id
        ]);
    }

    public function create(Request $request)
    {
        $divisions = Division::orderBy('name')->get();

        return Inertia::render('Admin/Proker/Create-ProgramKerja', [
            'divisions' => $divisions,
            'selectedDivisionId' => $request->division_id
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'division_id' => 'required|exists:divisions,id',
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'description' => 'required|string',
            'status' => 'required|string|in:Perencanaan,Progress,Selesai',
            'documentation.*' => 'nullable|file|max:20480', // 20MB max per file
        ]);

        $documentationPaths = [];

        if ($request->hasFile('documentation')) {
            foreach ($request->file('documentation') as $file) {
                $path = $file->store('program-kerja', 'public');
                $documentationPaths[] = Storage::url($path);
            }
        }

        ProgramKerja::create([
            'division_id' => $validated['division_id'],
            'title' => $validated['title'],
            'event_date' => $validated['event_date'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'documentation' => $documentationPaths,
        ]);

        return redirect()->route('admin.program-kerja.index')
            ->with('success', 'Program Kerja berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $programKerja = ProgramKerja::findOrFail($id);
        $divisions = Division::orderBy('name')->get();

        return Inertia::render('Admin/Proker/Edit-ProgramKerja', [
            'programKerja' => $programKerja,
            'divisions' => $divisions
        ]);
    }

    public function update(Request $request, $id)
    {
        $programKerja = ProgramKerja::findOrFail($id);

        $validated = $request->validate([
            'division_id' => 'required|exists:divisions,id',
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'description' => 'required|string',
            'status' => 'required|string|in:Perencanaan,Progress,Selesai',
            'documentation.*' => 'nullable|file|max:20480',
            'existing_documentation' => 'nullable|array',
        ]);

        $documentationPaths = $validated['existing_documentation'] ?? [];

        if ($request->hasFile('documentation')) {
            foreach ($request->file('documentation') as $file) {
                $path = $file->store('program-kerja', 'public');
                $documentationPaths[] = Storage::url($path);
            }
        }

        $programKerja->update([
            'division_id' => $validated['division_id'],
            'title' => $validated['title'],
            'event_date' => $validated['event_date'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'documentation' => $documentationPaths,
        ]);

        return redirect()->route('admin.program-kerja.index')
            ->with('success', 'Program Kerja berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $programKerja = ProgramKerja::findOrFail($id);

        // Delete documentation files
        if ($programKerja->documentation) {
            foreach ($programKerja->documentation as $path) {
                $relativePath = str_replace('/storage/', '', $path);
                Storage::disk('public')->delete($relativePath);
            }
        }

        $divisionId = $programKerja->division_id;
        $programKerja->delete();

        return redirect()->route('admin.program-kerja.index')
            ->with('success', 'Program Kerja berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Mail::to('hmrpm.teknik@unej.ac.id')->send(new \App\Mail\ContactMail($request->all()));

        return Redirect::back()->with('success', 'Pesan Anda telah berhasil terkirim!');
    }
}

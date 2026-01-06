<!DOCTYPE html>
<html>

<head>
    <title>Pesan Kontak Baru</title>
</head>

<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #bc1c2c; border-bottom: 2px solid #bc1c2c; padding-bottom: 10px;">Pesan Kontak Baru</h2>

        <p><strong>Nama:</strong> {{ $data['name'] }}</p>
        <p><strong>Email:</strong> {{ $data['email'] }}</p>
        <p><strong>Subjek:</strong> {{ $data['subject'] }}</p>

        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #bc1c2c;">
            <p><strong>Pesan:</strong></p>
            <p>{{ $data['message'] }}</p>
        </div>

        <footer style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            <p>Email ini dikirim otomatis dari formulir kontak website HMRPM UNEJ.</p>
        </footer>
    </div>
</body>

</html>
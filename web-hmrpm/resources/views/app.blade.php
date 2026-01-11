<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'HMRPM UNEJ - Himpunan Mahasiswa Rekayasa Perancangan Mekanik') }}</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="Himpunan Mahasiswa Rekayasa Perancangan Mekanik Universitas Jember - Mewadahi aspirasi, kreativitas, dan inovasi mahasiswa untuk masa depan teknologi yang lebih baik. Pusat pengembangan kreativitas berbasis teknologi di era industri 4.0.">
    <meta name="keywords" content="HMRPM, HMRPM UNEJ, Rekayasa Perancangan Mekanik, Universitas Jember, Himpunan Mahasiswa, RPM UNEJ, Teknik Mesin UNEJ, Organisasi Mahasiswa UNEJ, Vokasi UNEJ, Desain Mekanik">
    <meta name="author" content="HMRPM Universitas Jember">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://hmrpmunej.id">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://hmrpmunej.id">
    <meta property="og:title" content="HMRPM UNEJ - Himpunan Mahasiswa Rekayasa Perancangan Mekanik">
    <meta property="og:description" content="Mewadahi aspirasi, kreativitas, dan inovasi mahasiswa Rekayasa Perancangan Mekanik untuk masa depan teknologi yang lebih baik.">
    <meta property="og:image" content="https://hmrpmunej.id/logo.png">
    <meta property="og:site_name" content="HMRPM UNEJ">
    <meta property="og:locale" content="id_ID">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://hmrpmunej.id">
    <meta name="twitter:title" content="HMRPM UNEJ - Himpunan Mahasiswa Rekayasa Perancangan Mekanik">
    <meta name="twitter:description" content="Mewadahi aspirasi, kreativitas, dan inovasi mahasiswa Rekayasa Perancangan Mekanik untuk masa depan teknologi yang lebih baik.">
    <meta name="twitter:image" content="https://hmrpmunej.id/logo.png">

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/logo.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
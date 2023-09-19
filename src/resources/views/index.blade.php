 <!-- resources/views/index.blade.php -->
 <!DOCTYPE html>
 <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

 <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">

     <title>laravel view</title>
     {{-- @viteReactRefresh は @vite() より先に読み込む --}}
     @viteReactRefresh
     @vite(['resources/css/app.css', 'resources/scss/app.scss', 'resources/ts/index.tsx'])
 </head>

 <body>
     <div id="app"></div>
 </body>

 </html>

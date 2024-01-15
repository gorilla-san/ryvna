const baseHtml = () => {
    return (
        <html>
            <head>
                <script
                    src="https://unpkg.com/htmx.org@1.9.10"
                    integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
                    crossorigin="anonymous"
                ></script>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="//unpkg.com/alpinejs" defer></script>
                <link rel="stylesheet" href="public/styles.css" />
            </head>
            <body class="w-full h-[100vh]">
                <div id="app" class="w-full h-full bg-slate-900">
                    <main class="w-[40rem] h-full bg-slate-950 mx-auto">
                        <div class="flex-grow text-white">
                            some text
                            more text
                            making a change
                            making more changes
                        </div>
                        <div class="h-10 w-full px-4 py-2">
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
};

export default baseHtml;


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="pagina.css">
</head>
<body>
    <div id="screen_background">
        <main id="form_result">
            <div id="result">
                <div id="window_tittle">
                    <p>Login_result</p>
                </div>
                <div id="form_text">
                    <ul>
                        <?php
                        foreach ($_POST as $name => $value) {
                            echo "<li>$name: $value</li>";
                        }
                        ?>
                    </ul>
                </div>
            </div>
            <div id="nav_buttons">
                <a href="index.html">Return to login</a>
            </div>
        </main>
    </div>
</body>
</html>
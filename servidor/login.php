<?php
include_once ("plantilla.php")
?>
<script>
    function generar_certificado() {
        var firma = document.getElementById("firma").value;
        var login = document.getElementById("login").value;
        var certificado = hex_md5(firma + login);
        window.alert("Certificado = "+ certificado);
        document.getElementById("firma").value = certificado;
        return true;
    }
</script>
<br><br>
<div class="row">
    <div class="col-4"></div>
    <div class="col-4">
        <center>
            <h2>Iniciar sesión </h2><br>
            <img class="card-img-top" src="img/user.png" alt="usuario" style="width: 200px">
            <form id="form-registro" action="comparar.php" method="post" onsubmit="return generar_certificado();">
                <br>
                <div class="form-group">
                    <input type="text" class="form-control" id="login" name="login" placeholder="Ingresa el Login"><br>
                    <input type="password" class="form-control" id="pw" name="pass" placeholder="Ingresa la Contraseña"><br>
                    <input type="text" class="form-control" id="firma" name="firma" placeholder="Ingresa la Firma">

                </div>
                <button type="submit" id="registrar" class="btn btn-primary">Enviar</button>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                    Registrar
                </button>
                <div id="divres"></div>
            </form>
        </center>
    </div>
    <div class="col-4"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="form-registro" action="agrgar_registro.php" method="post" onsubmit="return generar_certificado2();">
                <input type="text" class="form-control" id="login2" name="login2" placeholder="Ingresa el Login"><br>
                <input type="password" class="form-control" id="pw2" name="pass2" placeholder="Ingresa la Contraseña"><br>
                <input type="text" class="form-control" id="firma2" name="firma2" placeholder="Ingresa la Firma"><br>
                <input type="text" class="form-control" id="tel" name="tel" placeholder="Ingresa tu numero de teléfono"><br>
                <input type="email" class="form-control" id="correo" name="correo" placeholder="Ingresa tú correo electrónico"><br>
                    <button type="submit" class="btn btn-primary">Registrar</button
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                >
            </div>
        </div>
    </div>
</div>
<script>
    function generar_certificado2() {
        var firma = document.getElementById("firma2").value;
        var login = document.getElementById("login2").value;
        var certificado = hex_md5(firma + login);
        document.getElementById("firma2").value = certificado;
        return true;
    }
</script>
<script
    src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous"></script>
<script src="http://pajhome.org.uk/crypt/md5/2.2/md5-min.js"></script>

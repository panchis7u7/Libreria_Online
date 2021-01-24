import '../../SCSS/Welcome.css';

function Welcome(props) {
    const { user } = (props.location && props.location.state) || {};
    return (
        <div>
            <section class="welcome-box">
                <img src="https://icons-for-free.com/iconfiles/png/512/profile+user+icon-1320166082804563970.png"></img>
            </section>
            <h1>Hola {user}!</h1>
        </div>
    );
}

export default Welcome;
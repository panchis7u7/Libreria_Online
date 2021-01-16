import React from 'react';
import {Image} from 'react-bootstrap';
import '../../SCSS/libreria.scss'

export default class Libros extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
        }
    }

    render(){
        const { bookshelves } = this.props;
        return(
            <main className="cuerpo">
                <Image className="banner" src="https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg" fluid></Image>
                <section className="popular">
                    <Book></Book>
                </section>
            </main>
        );
    }
}

const Book = props => {
    const { book } = props;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                    style={{width: 128,
                            height: 193,
                            backgroundImage:
                            'url("https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX")',
                    }}/>
                </div>
                <div className="book-title">C# in a nutshell 7.0</div>
                <div className="book-authors">Joseph Albahari</div>
            </div>
        </li>
    );
};

//4k -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_3840x2400.jpg
//HD -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg
//https://wallpaperscraft.com/download/monstera_leaves_art_128418/3840x2400
//Muy buena imagen para algun fondo!
import React from 'react';
import logo from './../media/logo.png';

class Header extends React.Component {
    render() {
        return(
            
            <React.Fragment> 
            <nav class="navbar navbar-blue py-2 navbar-expand-sm  blue-sky">
            <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav" aria-controls="mobile-nav" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
           
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                       
                        <a href="dashboard.html" class="nav-link">
                            <i class="far fa-envelope"></i>
                            Newsletter</a>
                    </li>
                     <li class="nav-item">
                        
                     <a href="feed.html" class="nav-link">
                        <i class="far fa-heart"></i>
                         Post Feed</a>
                     </li>
                    <li class="nav-item">
                        <a href="register.html" class="nav-link">Nouveautés</a>
                    </li>
                    <li class="nav-item">
                        <a href="login.html" class="nav-link">Connexion</a>
                    </li>
                </ul>
            </div>
            </nav>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src={logo} /></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav" aria-controls="mobile-nav" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mobile-nav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="destinations.html" class="nav-link">Destinations</a>
                        </li>
                        <li class="nav-item">
                            <a href="hebergements.html" class="nav-link">Hébergements</a>
                        </li>
                         <li class="nav-item">
                         <a href="inspirations.html" class="nav-link">Inspirations</a>
                         </li>
                        <li class="nav-item">
                            <a href="register.html" class="nav-link">Publier des annoces</a>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>

            </React.Fragment>

        )
    }
}

export default Header; 

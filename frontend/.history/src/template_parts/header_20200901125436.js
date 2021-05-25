import React from 'react';

class Header extends React.Component {
    render() {
        return(
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


        )
    }
}

export default Header; 

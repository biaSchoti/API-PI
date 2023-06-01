import React from "react"
import "././"

const Home = () => {
    return (
        <>
            <Header/>
            
                <div class="banner">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <a href="/product/nossoproduto">
                                    <img src="/images/Logo/Seja.Bem.Vindo.png" class="img-fluid" alt="..."/>
                                </a>
                            </div>
                            <div class="carousel-item">
                                <img src="/images/Diversas/nova.cerveja.png" class="img-fluid" alt="..."/>
                            </div>
                            <div class="carousel-item">
                                <img src="/images/Diversas/em.breve.png" class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
            

           <Footer/>
        </>
    )

}
export default Home
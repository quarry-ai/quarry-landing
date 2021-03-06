import React, {useState, useRef, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import ReactParticles from 'react-particles-js';
import particlesConfig from './particles-config.js';
import './styles.scss'

export default function App() {
    return (
        <div className="main">
            <Particles>
                <Hero>
                    <div className="container">
                        <Info/>
                        <div className="row">
                            {cards.map((card, i) => (
                                <div key={i} className="column">
                                    <Card key={i}>
                                        <div className="card-title">{card.title}</div>
                                        <div className="card-body">{card.description}</div>
                                        <Image ratio={card.imageRatio} src={card.image}/>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </Hero>
            </Particles>
        </div>
    );
}

function Card({children}) {
    // We add this ref to card element and use in onMouseMove event ...
    // ... to get element's offset and dimensions.
    const ref = useRef();

    // Keep track of whether card is hovered so we can increment ...
    // ... zIndex to ensure it shows up above other cards when animation causes overlap.
    const [isHovered, setHovered] = useState(false);

    const [animatedProps, setAnimatedProps] = useSpring(() => {
        return {
            // Array containing [rotateX, rotateY, and scale] values.
            // We store under a single key (xys) instead of separate keys ...
            // ... so that we can use animatedProps.xys.interpolate() to ...
            // ... easily generate the css transform value below.
            xys: [0, 0, 1],
            // Setup physics
            config: {mass: 10, tension: 400, friction: 40, precision: 0.00001}
        };
    });

    return (
        <animated.div
            ref={ref}
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseMove={({clientX, clientY}) => {
                // Get mouse x position within card
                const x =
                    clientX -
                    (ref.current.offsetLeft -
                        (window.scrollX || window.pageXOffset || document.body.scrollLeft));

                // Get mouse y position within card
                const y =
                    clientY -
                    (ref.current.offsetTop -
                        (window.scrollY || window.pageYOffset || document.body.scrollTop));

                // Set animated values based on mouse position and card dimensions
                const dampen = 50; // Lower the number the less rotation
                const xys = [
                    -(y - ref.current.clientHeight / 2) / dampen, // rotateX
                    (x - ref.current.clientWidth / 2) / dampen, // rotateY
                    1.07 // Scale
                ];

                // Update values to animate to
                setAnimatedProps({xys: xys});
            }}
            onMouseLeave={() => {
                setHovered(false);
                // Set xys back to original
                setAnimatedProps({xys: [0, 0, 1]});
            }}
            style={{
                // If hovered we want it to overlap other cards when it scales up
                zIndex: isHovered ? 2 : 1,
                // Interpolate function to handle css changes
                transform: animatedProps.xys.interpolate(
                    (x, y, s) =>
                        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
                )
            }}
        >
            {children}
        </animated.div>
    );
}

function Particles({children}) {
    return (
        <div style={{position: 'relative'}}>
            <ReactParticles
                params={particlesConfig}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }}
            />
            {children && <div style={{position: 'relative'}}>{children}</div>}
        </div>
    );
}

function Hero({children}) {
    return (
        <div className="hero">
            <div className="hero-body">{children}</div>
        </div>
    );
}

function Image({ratio, src}) {
    return (
        <div className="image-container">
            <div className="image-inner-container">
                <div
                    className="ratio"
                    style={{
                        paddingTop: ratio * 100 + '%'
                    }}
                >
                    <div className="ratio-inner">
                        <img src={src}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info() {
    return (
        <div className="info">
            <Image ratio={1} src={'./biglogo.png'} />
        </div>
    );
}

const cards = [
    {
        title: 'Start Mining ??????',
        description:
            'Hook up to any API or website on the internet and our miners will start creating your custom dataset. Configure your miners so that they only collect the highest quality data.',
        image: 'https://6jlvz1j5q3.csb.app/undraw_collection.svg',
        imageRatio: 784 / 1016
    },
    {
        title: 'Data Marketplace ????',
        description:
            "Once your miners have curated your dataset, throw it on the marketplace and start earning money. Don't have time to build your own datasets? Explore terabytes of pre-mined, up-to-date data.",
        image: 'https://6jlvz1j5q3.csb.app/undraw_upload.svg',
        imageRatio: 839 / 1133
    },
    {
        title: 'Export Datasets ????',
        description:
            "Once you've mined your data, export your datasets in the format of your choice. Now the analysis or model training starts!",
        image: 'https://6jlvz1j5q3.csb.app/undraw_static_assets.svg',
        imageRatio: 730 / 1030
    }
];

// import React from 'react';
// import { Container, makeStyles } from '@material-ui/core';
// import Page from 'src/components/Page';
// import Particles from 'react-particles-js';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         minHeight: '100%',
//         paddingBottom: theme.spacing(3),
//         paddingTop: theme.spacing(3)
//     }
// }));

// const LandingView = () => {
//     const classes = useStyles();

//     return (
//         <Page className={classes.root} title="Quarry">
//             <Container maxWidth="lg">
//                 <h1>Testing2</h1>
//                 <Particles
//                     params={{
//                         particles: {
//                             color: {
//                                 value: "#000000"
//                             },
//                             line_linked: {
//                                 color: {
//                                 value: "#000000"
//                                 }
//                             },
//                             number: {
//                                 value: 50
//                             },
//                             size: {
//                                 value: 3
//                             }
//                         }
//                     }}
//                     style={{
//                         width: '100%',
//                         backgroundImage: `url(${logo})`
//                     }}
//                     />
//             </Container>
//         </Page>
//     );
// };

// export default LandingView;

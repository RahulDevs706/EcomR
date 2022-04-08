import React from 'react'

import './footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h1>Ecom-R</h1>
                <p>Copyright 2021 &copy; RS Corp.</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://instagram.com/rahulsingh.jsx" target="_blank" rel='noreferrer'>Instagram</a>
                <a href="https://linkedin.com/in/rahuldevs706"  target="_blank" rel='noreferrer'>LinkedIn</a>
                <a href="https://github.com/RahulDevs706"  target="_blank" rel='noreferrer'>GitHub</a>
            </div>
        </footer>
    )
}

export default Footer

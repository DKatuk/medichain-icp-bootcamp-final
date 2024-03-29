import React from 'react'

function NavBar() {
    return (
        <div className="w-full shadow-md h-16 flex justify-center items-center bg-white">
            <a href="/"><img src="/logo.png" style={{ width: "50px", height: "50px" }} alt="logo" /></a>
        </div>
    )
}

export default NavBar
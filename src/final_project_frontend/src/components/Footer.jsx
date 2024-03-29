import React from 'react'

function Footer() {
    return (
        <div className="bg-slate-800 h-28 text-slate-50 text-center flex flex-col w-full justify-center items-center mt-20 py-6">
            <p>&copy; copyrigth belongs to Dilara Katuk</p>
            <section className="flex gap-5">
                <a href="https://github.com/DKatuk" target="_blank">
                    <img src="/github.png" style={{ width: "50px", height: "50px" }} className="rounded-md overflow-hidden"></img>
                </a>
                <a href="https://www.linkedin.com/in/dilara-katuk/" target="_blank">
                    <img src="/linkedin.png" style={{ width: "50px", height: "50px" }} className="rounded-md overflow-hidden"></img>
                </a>
            </section>
        </div>
    )
}

export default Footer
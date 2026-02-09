import React, { useState } from "react";
//import Footer from "../Common/Footer";

import Login from "./Login";
import Register from "./Register";

const Landing = () => {

    const [toggle, setToggle] = useState(true);
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className="w-3/4">
                    <div className="flex flex-wrap h-[500px]">
                        <div className="lg:w-1/2 w-full">
                            <h1 className="text-green-400 font-black text-4xl lg:text-8xl lg:leading-[1.2]">Deets</h1>
                            <span className="text-stone-700 font-light text-lg">A Complete Solution to Your Reports</span>
                        </div>
                        <div className={`lg:w-1/2 w-full p-8 shadow-2xl shadow-orange-400/75 
                        ${toggle ? "h-[390px]" : "h-[540px]"}`}>
                            {toggle ? <Login /> : <Register />}
                            <p className="mt-8 text-stone-700">
                                {toggle ? <>No Account. Please, <button onClick={() => setToggle(false)} className="text-lime-500">
                                    Click here
                                </button>  to register.</> : <>Already registered! <button onClick={() => setToggle(true)} className="text-lime-500">Click here</button></>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
export default Landing;
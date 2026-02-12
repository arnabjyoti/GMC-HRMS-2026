import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full flex justify-between items-center pt-[15px] pb-[15px] pl-[8%] pr-[8%]">
            <img src="" alt="" />
            <ul className="pt-[10px] pb-[10px] pr-[30px] pl-[30px] rounded-4xl shadow-2xl shadow-blue-400">
                <Link to='/'><li className="inline-block pt-[5px] pb-[5px] pl-[10px] pr-[10px] mt-[0px] mb-0 ml-[10px] mr-[10px] text-cyan-300">Home</li></Link>
                <Link to='/addCase'><li className="inline-block pt-[5px] pb-[5px] pl-[10px] pr-[10px] mt-[0px] mb-0 ml-[10px] mr-[10px] text-cyan-300">Add Case</li></Link>
                <Link to='/updateCase'><li className="inline-block pt-[5px] pb-[5px] pl-[10px] pr-[10px] mt-[0px] mb-0 ml-[10px] mr-[10px] text-cyan-300">Update Case</li></Link>
                <Link to='/disposedCase'><li className="inline-block pt-[5px] pb-[5px] pl-[10px] pr-[10px] mt-[0px] mb-0 ml-[10px] mr-[10px] text-cyan-300">Disposed Case</li></Link>
                <Link to='/report'><li className="inline-block pt-[5px] pb-[5px] pl-[10px] pr-[10px] mt-[0px] mb-0 ml-[10px] mr-[10px] text-cyan-300">Report</li></Link>
            </ul>
        </div>
    );
}
export default Navbar;
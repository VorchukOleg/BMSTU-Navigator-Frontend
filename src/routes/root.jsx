import React from 'react';
import { Link } from 'react-router-dom';

const buttonClass = `
  rounded-md 
  bg-indigo-600 
  text-sm 
  font-semibold 
  text-white 
  shadow-sm 
  hover:bg-indigo-500 
  focus-visible:outline 
  focus-visible:outline-2 
  focus-visible:outline-offset-2 
  focus-visible:outline-indigo-600
`;

export default function Root() {
  return (
    <div className="grid grid-cols-2 gap-4 h-screen">
      <div className="flex justify-center items-center">
        <img className="h-96" src="images/gas-kvas-com-p-emblema-mgtu-na-prozrachnom-fone-2.png"/>
      </div>
      <div className="flex flex-col justify-center items-stretch gap-8 max-w-xs">
        <div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Навигатор по <br/>
            <span className="text-blue-800">МГТУ <br/>им.&nbsp;Н.Э.&nbsp;Баумана</span>
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Выберите&nbsp;здание&nbsp;для&nbsp;построения&nbsp;маршрута
          </p>
        </div>
        <span className={buttonClass}>
          <Link className="block px-3.5 py-2.5 w-full h-full rounded-md text-center" to={'/MAB'}>
            Главный учебный корпус
          </Link>
        </span>
        <span className={buttonClass}>
          <Link className="block px-3.5 py-2.5 w-full h-full rounded-md text-center" to={'/ELB'}>
            Учебно-лабораторный корпус
          </Link>
        </span>
        <span className={buttonClass}>
          <Link className="block px-3.5 py-2.5 w-full h-full rounded-md text-center" to={'/RFH'}>
            Дом РФ
          </Link>
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  useLoaderData,
} from "react-router-dom";

export async function loader({params}) {
  floorUUID = params.floorUUID;

  return {floorUUID};
}

export default function Scheme() {
  const floorUUID = useLoaderData();
  
  return (
    <div>{floorUUID}</div>
  )
}

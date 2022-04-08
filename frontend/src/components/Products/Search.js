import React, { Fragment, useState } from 'react'
import {useHistory} from "react-router-dom"
import "./searchBar.css"

const Search = ({history}) => {
   

    const [keyWord, setKeyWord] = useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();

        if(keyWord.trim()){
            history.push(`/products/${keyWord}`)
        }else{
            history.push('/products')
        }
    }

    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input 
                    type="text" 
                    placeholder="Search a product..."
                    onChange={(e)=>setKeyWord(e.target.value)}
                 />
                <input 
                    type="submit"
                    value="Search"
                />
            </form>
        </Fragment>
    )
}

export default Search

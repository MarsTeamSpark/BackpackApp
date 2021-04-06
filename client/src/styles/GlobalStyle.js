import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body {
        /* background: linear-gradient(35deg, rgba(56,127,117, 1) 0%, rgba(123,188,182, 1) 35%, rgba(152,228,217, 1) 100%); */
        background-color: rgba(124,196,185);
        font-family: "Lucida Console", "Courier New", monospace;

    }
    img{
        width: 100%;
        height: auto;
        display: block;
    }
    .map {

    }
    .input {
 
    }
    .information-class {
       
    }
    button{
        outline: none;
        border: none;
        border-radius: 0.25rem;
        transition: box-shadow 75ms;
        box-shadow: 0 0 2px rgba(75, 75, 75, 1);
        :hover{
            box-shadow: 0 0 6px rgba(75, 75, 75, 1);
        }
        :active{
            box-shadow: 0 0 2px rgba(75, 75, 75, 1);
        }
    }
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(152,228,217);
        border-color: rgb(56,127,117);
        border-radius: 10px;
        .image-container {
            width:100px;
            height:100px;
            object-fit:scale-down;
        }
    }
    h1 {
        
    }
    h2 {
        
    }






`;


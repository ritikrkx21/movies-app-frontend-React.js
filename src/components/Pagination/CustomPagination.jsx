import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


const darkTheme = createTheme({
   palette: {
       type : 'dark',
   },
});


const CustomPagination = ({setpage, numOfPages = 10}) => {

  const handlePageChange = (page) =>{
     setpage(page);
     window.scroll(0,0);
  };

  return (
    <div 

    style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        priamry: blue,
    }}
    >
    
    <ThemeProvider theme={darkTheme} >
       <Pagination 
         count={numOfPages} 
         onChange ={(e) => handlePageChange(e.target.textContent)}
       />
    </ThemeProvider>
    </div>
  )
}

export default CustomPagination
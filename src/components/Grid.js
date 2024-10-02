import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import CoinDetailsModal from './coinDetailsModal.js';
import './Grid.css';

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  //const [error, setError] = useState(null);
  const ImageWithFallback = ({ src, alt, defaultImg }) => {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(defaultImg);
    };
  
    return <img src={imgSrc} alt={alt} onError={handleError} style={{width : '30px', height : '30px'}}/>;
  };
  useEffect(() => {
    fetch('/coinList') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setRows(data);
        setOriginalRows(data);
        setLoading(false);
      })
      .catch(error => {
        //setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  //console.log('hello',rows)
  //if (error) return <p>Error loading data!</p>;

  const requestSearch = (searchedVal) => {
    
    const filteredRows = originalRows.filter(row => {
      return row.pair.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const handleRowClick = (coin) => {
    setSelectedCoin(coin);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  }; 
  const cancelSearch = () => {
    setSearched("");
    setRows(originalRows);
  };
  const sortArray = (arr, orderBy, culprit) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a[culprit] > b[culprit] ? 1 : b[culprit] > a[culprit] ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a[culprit] < b[culprit] ? 1 : b[culprit] < a[culprit] ? -1 : 0
        );
    }
  };

  const handleSortRequest = (culprit) => {
    setRows(sortArray(rows, orderDirection, culprit));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      
        <SearchBar
          className="srh"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      <Paper style={{width : "90%", margin : "auto"}}>
        <TableContainer style={{ maxHeight : "80vh", margin : "auto"}}>
          <Table className="tcon" aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Pair</TableCell>
                <TableCell align="center" onClick={() => handleSortRequest('currentPrice')}>
                  <TableSortLabel active={true} direction={orderDirection} style={{marginLeft : "2vw"}}>
                    Price&nbsp;($)
                 </TableSortLabel>
                </TableCell>
                <TableCell align="center" onClick={() => handleSortRequest('priceChangePercent')}>
                  <TableSortLabel active={true} direction={orderDirection}>
                    Price Change
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.pair} onClick={() => handleRowClick(row)}>
                <TableCell align="center">
                  <ImageWithFallback src={row.symbol} alt="not available" defaultImg="http://localhost:3001/images/default.png" />
                  <div style={{ padding: 'auto', marginTop: '2px' }}>{row.pair}</div>
                </TableCell>
                  <TableCell align="center">{row.currentPrice}</TableCell>
                  <TableCell align="center">{row.priceChangePercent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      {selectedCoin && (
        <CoinDetailsModal
          open={modalOpen}
          handleClose={handleCloseModal}
          coin={selectedCoin}
        />
      )}
    </>
  );
}

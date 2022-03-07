import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Modal, Button } from 'react-bootstrap'

const Pagination = () => {
    const[players, setPlayers] = useState([])
    const[modalInfo, setModalInfo] = useState([])
    const[showModal, setShowModal] = useState(false)
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const getPlayerData = async () => {
        try {
            const data = await axios.get('https://nba-players.herokuapp.com/players-stats')
            setPlayers(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPlayerData()

    }, [])

    const columns = [
        {dataField: "name", text: "Player Name"},
        {dataField: "team_name", text: "Team Name"},
        {dataField: "games_played", text: "Number of games played"},
        {dataField: "points_per_game", text: "Points per game"},
        {dataField: "assists_per_game", text: "Assists per game"},
        {dataField: "rebounds_per_game", text: "Rebounds per game"},
    ];

    const rowEvents = {
        onClick: (e, row) => {
            console.log(row)
            setModalInfo(row)
            toggleTrueFalse()
        }
    };

    const toggleTrueFalse = () => {
        setShowModal(handleShow)
    };

    const ModalContent = () =>{
        return(
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>

        )
    }

    return (
        <div className="App">
            <h1>Pagination</h1>
            <BootStrapTable
            keyField="name"
            data={players}
            columns={columns}
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            />

            {show ? <ModalContent/> : null}
        </div>
    )
}

export default Pagination
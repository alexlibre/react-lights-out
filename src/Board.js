import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
    static defaultProps = {
        nrows: 6,
        ncols: 6,
        chanceLightStartsOn: 0
    }
    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        }
    }

    createBoard() {
        let board = [];
        for(let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for(let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightStartsOn)
            }
            board.push(row);
        }
        return board;
    }

    flipCellsAround(coord) {
        console.log(coord);
        
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split('-').map(Number);

        function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        flipCell(y, x);
        flipCell(y - 1, x);
        flipCell(y + 1, x);
        flipCell(y, x - 1);
        flipCell(y, x + 1);

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });
    }

    render() {
        if (this.state.hasWon) {
            return (
                <h1 className="Board-title has-won">
                    <span className="neon-orange">You_</span><span className="neon-blue">won</span>
                </h1>
            );
        }
        let tblBoard = [];
        for(let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for(let x = 0; x < this.props.ncols; x++) {
                const coord = y + '-' + x;
                row.push(<Cell 
                            isLit={this.state.board[y][x]} 
                            key={coord}
                            flipCellsAroundMe={() => this.flipCellsAround(coord)}/>);
            }
        tblBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <div>
                <h1 className="Board-title">
                    <span className="neon-orange">Lights_</span><span className="neon-blue">out</span>
                </h1>
                <table className="Board">
                    <tbody>
                        {tblBoard}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;
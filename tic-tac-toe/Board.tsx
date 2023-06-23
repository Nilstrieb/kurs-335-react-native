import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type SquareState = "O" | "X" | " ";
type BoardState = "O" | "X" | "draw" | "ongoing";

type GameState =
  | { state: "playing" }
  | { state: "end"; winner: "O" | "X" | "draw" };

function determineWinner(board: SquareState[]): BoardState {
  const SEQUENCES = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const seq of SEQUENCES) {
    const candidate = board[seq[0]];
    if (candidate === " ") {
      continue;
    }
    if (board[seq[1]] === candidate && board[seq[2]] === candidate) {
      return candidate;
    }
  }
  if (!board.some((s) => s === " ")) {
    return "draw";
  }
  return "ongoing";
}

const Board = () => {
  const [squares, setSquares] = useState<SquareState[]>(Array(9).fill(" "));
  const [xPlaying, setXPlaying] = useState(true);
  const [gameState, setGameState] = useState<GameState>({ state: "playing" });

  const reset = () => {
    setSquares(Array(9).fill(" "));
    setXPlaying(true);
    setGameState({ state: "playing" });
  };

  const handleClick = (field: number) => {
    if (gameState.state !== "playing") {
      return;
    }
    if (squares[field] !== " ") {
      return;
    }

    const newSquares = [...squares];
    newSquares[field] = xPlaying ? "X" : "O";
    setSquares(newSquares);
    setXPlaying(!xPlaying);

    const winner = determineWinner(newSquares);
    if (winner === "ongoing") {
      return;
    }
    setGameState({ state: "end", winner: winner });
    Alert.alert("Result", winner, [{ text: "OK", onPress: reset }], {
      cancelable: false,
    });
  };

  return (
    <View style={styles.board}>
      <View style={styles.boardRow}>
        <Square field={squares[0]} onPress={() => handleClick(0)} />
        <Square field={squares[1]} onPress={() => handleClick(1)} />
        <Square field={squares[2]} onPress={() => handleClick(2)} />
      </View>

      <View style={styles.boardRow}>
        <Square field={squares[3]} onPress={() => handleClick(3)} />
        <Square field={squares[4]} onPress={() => handleClick(4)} />
        <Square field={squares[5]} onPress={() => handleClick(5)} />
      </View>

      <View style={styles.boardRow}>
        <Square field={squares[6]} onPress={() => handleClick(6)} />
        <Square field={squares[7]} onPress={() => handleClick(7)} />
        <Square field={squares[8]} onPress={() => handleClick(8)} />
      </View>

      <View>
        <Pressable onPress={reset}>
          <Text style={styles.reset}>reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Square = ({
  field,
  onPress,
}: {
  field: SquareState;
  onPress: () => void;
}) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{field}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  board: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boardRow: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 40,
    textAlign: "center",
  },
  reset: {
    fontSize: 20,
  },
});

export default Board;

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type User = {
  id: string;
  name: string;
  coins: number;
};

const LeaderBoard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [topPlayer, setTopPlayer] = useState<User | null>(null);

  useEffect(() => {
    const mockUsers: User[] = [
      { id: "1", name: "Alice", coins: 120 },
      { id: "2", name: "Bob", coins: 100 },
      { id: "3", name: "Charlie", coins: 90 },
      { id: "4", name: "David", coins: 80 },
      { id: "5", name: "Eve", coins: 70 },
    ];

    const sortedUsers = [...mockUsers].sort((a, b) => b.coins - a.coins);
    setUsers(sortedUsers);
    setTopPlayer(sortedUsers[0]);
  }, []);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={[styles.row, index === 0 && styles.topPlayerRow]}>
      <Text style={[styles.rank, index === 0 && styles.topRank]}>{index + 1}</Text>
      <Text style={[styles.name, index === 0 && styles.topName]}>
        {item.name} {index === 0 && "🏆"}
      </Text>
      <Text style={[styles.coins, index === 0 && styles.topCoins]}>{item.coins} Coins</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {topPlayer && (
        <View style={styles.giftBanner}>
          <Text style={styles.giftText}>
            🎁 {topPlayer.name} is the Top Player of the Month!
          </Text>
          <Text style={styles.giftSubText}>
            We’ll send a special gift to their registered address.
          </Text>
        </View>
      )}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Rank</Text>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Coins</Text>
          </View>
        }
      />
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FF6A00",
  },
  giftBanner: {
    backgroundColor: "#FFF7E6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFD580",
  },
  giftText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D17B00",
  },
  giftSubText: {
    fontSize: 14,
    color: "#A65F00",
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topPlayerRow: {
    backgroundColor: "#E6F7FF",
    borderWidth: 1,
    borderColor: "#91D5FF",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    width: "15%",
    textAlign: "center",
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    width: "50%",
    textAlign: "left",
  },
  coins: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28A745",
    width: "35%",
    textAlign: "right",
  },
  topRank: {
    color: "#FF8C00",
  },
  topName: {
    color: "#D2691E",
  },
  topCoins: {
    color: "#FF4500",
  },
});

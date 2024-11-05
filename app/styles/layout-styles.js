import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    headerRight: {
      marginRight: 10,
    },
    backButton: {
      marginLeft: 10,
    },
    dropdownOverlay: {
      width: 200,
      padding: 4,
      borderRadius: 10,
      position: 'absolute',
      top: 60,
      right: 0,
    },
    menuItemText: {
      fontSize: 14,
    }
  });

export default styles;
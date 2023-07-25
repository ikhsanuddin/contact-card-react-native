import { useState, useEffect, useCallback } from "react";
import { Animated, Text } from "react-native";
import Input from "@/components/Input";
import { Avatar } from "@/components/Avatar";
import Button from "@/components/Button";
import contactAPI from "@/service/contactAPI";
import { useFocusEffect } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { ContactResponse } from "@/types/contactAPI";

export default function Contact({ navigation }) {
  const [text, onChangeText] = useState("");
  const [contactList, setContactList] = useState<ContactResponse[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getAllContacts();
    }, [text])
  );

  const getAllContacts = async () => {
    setRefreshing(true);
    contactAPI.getAllContact().then(async (response) => {
      setContactList(response);
      setRefreshing(false);
    });
  };

  return (
    <Animated.FlatList
      ListHeaderComponent={
        <Input
          onChangeText={debounce((e) => onChangeText(e), 500)}
          placeholder="Search.."
          defaultValue={text}
        />
      }
      keyExtractor={(item) => item.id}
      data={contactList.filter((filteredContact) => {
        if (text && text.length > 2) {
          if (
            filteredContact.firstName.includes(text) ||
            filteredContact.lastName.includes(text)
          ) {
            return true;
          }
          return false;
        }
        return filteredContact;
      })}
      onRefresh={() => {
        getAllContacts();
      }}
      refreshing={refreshing}
      renderItem={({ item }) => (
        <Button
          key={item.id}
          style={{
            backgroundColor: "#fafafa",
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            elevation: 1,
            borderRadius: 10,
            marginHorizontal: 12,
            marginVertical: 5,
            padding: 5,
            justifyContent: "flex-start",
          }}
          onPress={() => navigation.navigate("ContactDetail", { ...item })}
        >
          <Avatar
            source={{
              uri:
                item.photo != "N/A"
                  ? item.photo
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
          />
          <Text style={{ fontSize: 24, marginLeft: 10 }}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
        </Button>
      )}
    />
  );
}

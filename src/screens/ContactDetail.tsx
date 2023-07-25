import { ScrollView, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "@/components/Avatar";
import Button from "@/components/Button";
import IconFav from "@/components/icons/IconFav";
import IconEdit from "@/components/icons/IconEdit";
import { useTranslation } from "@/hooks/useTranslation";

const avatarSize = 100;

export default function ContactDetail({ route, navigation }) {
  const { photo, firstName, lastName, age } = route.params;
  const { t } = useTranslation();

  const favourite = false;

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#dedede", "transparent", "transparent"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              marginTop: 50,
              marginHorizontal: 40,
              borderRadius: 20,
              minHeight: 150,
              backgroundColor: "#ffc700",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: -avatarSize / 2,
            }}
          >
            <Avatar
              style={{ width: avatarSize, height: avatarSize }}
              source={{
                uri:
                  photo !== "N/A"
                    ? photo
                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              }}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 25,
                marginTop: 10,
              }}
            >{`${firstName} ${lastName}`}</Text>
            <Text
              style={{
                color: "#7e7e7e",
                textAlign: "center",
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              {t("common.age")}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#7e7e7e",
              }}
            >
              {age}
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button style={{ margin: 10, padding: 10 }}>
            <IconFav fill />
            <Text>{favourite ? t("common.unfav") : t("common.fav")}</Text>
          </Button>
          <Button
            style={{ margin: 10, padding: 10 }}
            onPress={() => {
              navigation.navigate("ContactEdit", { ...route.params });
            }}
          >
            <IconEdit />
            <Text>Edit</Text>
          </Button>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

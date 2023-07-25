import { Avatar } from "@/components/Avatar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import imageAPI from "@/service/imageAPI";
import { PhotoResult } from "@/types/imageAPI";
import React, { useEffect, useState } from "react";
import {
  Modal,
  FlatList,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import debounce from "lodash.debounce";
import IconCamera from "@/components/icons/IconCamera";
import IconSave from "@/components/icons/IconSave";
import { useTranslation } from "@/hooks/useTranslation";
import contactAPI from "@/service/contactAPI";
import { StackActions } from "@react-navigation/native";

export default function ContactAdd({ route, navigation }) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [uuid, setUid] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );
  const [photosSelection, setPhotosSelection] = useState<PhotoResult[]>([
    {
      id: 1,
      src: { medium: "https://cdn-icons-png.flaticon.com/512/847/847969.png" },
    },
  ]);
  const [photosDefaultSelection, setPhotosDefaultSelection] = useState<
    PhotoResult[]
  >([]);

  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();

  useEffect(() => {
    const query =
      firstName && lastName ? `${firstName} ${lastName}` : "profile";

    imageAPI.getNineImages(query).then((response) => {
      setPhotosSelection(response);
      if (photosDefaultSelection.length === 0) {
        setPhotosDefaultSelection(response);
      }
    });
  }, [firstName, lastName]);

  const saveForm = async () => {
    const data = {
      firstName,
      lastName,
      age: Number(age),
      photo: profilePhoto,
    };

    try {
      if (uuid) {
        await contactAPI.editContact({ ...data, id: uuid }).then(() => {
          navigation.goBack();
          navigation.dispatch(
            StackActions.replace("ContactDetail", {
              ...data,
              id: uuid,
            })
          );
        });
      } else {
        await contactAPI.addContact({ ...data }).then(() => {
          navigation.goBack();
          Alert.alert(t('common.newCardSave'));
        });
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    if (route.params?.id) {
      const {
        age: editAge,
        photo: editPhoto,
        firstName: editFirstName,
        lastName: editLastName,
        id,
      } = route.params;

      setFirstName(editFirstName);
      setLastName(editLastName);
      setAge(editAge);
      setProfilePhoto(editPhoto);
      setUid(id);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Button onPress={() => setModalVisible(!modalVisible)}>
          <Avatar
            style={{
              width: 110,
              height: 110,
            }}
            source={{
              uri:
                profilePhoto && profilePhoto != "N/A"
                  ? profilePhoto
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
          />
          <View
            style={{
              marginRight: -60,
              marginTop: -24,
              opacity: 0.7,
              backgroundColor: "#fafafa",
              padding: 5,
              borderRadius: 100,
            }}
          >
            <IconCamera />
          </View>
        </Button>

        <View style={{ flexDirection: "row", flex: 0, marginHorizontal: 12 }}>
          <View style={{ width: "50%" }}>
            <Input
              label={t('common.firstName')}
              onChangeText={debounce((e) => setFirstName(e), 500)}
              defaultValue={firstName}
            />
          </View>
          <View style={{ width: "50%" }}>
            <Input
              label={t('common.lastName')}
              onChangeText={debounce((e) => setLastName(e), 500)}
              defaultValue={lastName}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 0, marginHorizontal: 12 }}>
          <View style={{ width: "100%" }}>
            <Input
              defaultValue={`${age}`}
              label={t('common.age')}
              onChangeText={debounce((e) => setAge(e), 500)}
              inputMode="numeric"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                width,
                height,
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
            pointerEvents={"box-none"}
          >
            <FlatList
              style={{
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical: 30,
                flex: 0,
                alignSelf: "center",
                flexGrow: 0,
                flexShrink: 1,
                backgroundColor: "#fefefe",
              }}
              horizontal
              data={
                photosSelection.length > 0
                  ? photosSelection
                  : photosDefaultSelection
              }
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setProfilePhoto(item.src.medium);
                    setModalVisible(false);
                  }}
                >
                  <Image
                    key={item.id}
                    style={{ width: 85, height: 85, margin: 10 }}
                    source={{
                      uri: item
                        ? item.src.medium
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                    }}
                  />
                </Pressable>
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          </Animated.View>
        </Modal>
        <View
          style={{
            flex: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            bottom: 0,
            position: "absolute",
            width: "100%",
          }}
        >
          <Button style={{ margin: 10, padding: 10 }} onPress={saveForm}>
            <IconSave />
            <Text>{t("common.save")}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

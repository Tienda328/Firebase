import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  const [notification, setNotification]=useState({title:undefined, body:undefined, img: undefined})
  const getTocken =async () =>{
    const Token = await messaging().getToken();
    console.log('token', Token)
  }


  useEffect(() => {
    getTocken();
     messaging().onMessage(async remoteMessage => {
     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
     setNotification({
       title:remoteMessage.notification.title,
       body:remoteMessage.notification.body,
       img: remoteMessage.notification.android.imageUrl
     });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage),
      );
      setNotification({
        title:remoteMessage.notification.title,
        body:remoteMessage.notification.body,
        img: remoteMessage.notification.android.imageUrl
      });
      // navigation.navigate(remoteMessage.data.type);
    });
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        JSON.stringify(remoteMessage); // e.g. "Settings"
      }
      setNotification({
        title:remoteMessage.notification.title,
        body:remoteMessage.notification.body,
        img: remoteMessage.notification.android.imageUrl
      });
      // setLoading(false);
    });
}, []);

  return(
    <View>
      <Text>dsdsd</Text>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`title: ${notification?.body}`}</Text>
      <Image source={{uri:notification?.img }} style={{width: 100, height: 100}} />
    </View>
  )
}
export default App;
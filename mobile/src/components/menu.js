import * as React from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';

const MyComponent = () => (
  <View style={{ flex: 1 }}>
    <Menu.Item icon="redo" onPress={() => {}} title="Redo" />
    <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
    <Menu.Item icon="content-cut" onPress={() => {}} title="Cut" disabled />
    <Menu.Item icon="content-copy" onPress={() => {}} title="Copy" disabled />
    <Menu.Item icon="content-paste" onPress={() => {}} title="Paste" />
  </View>
);

export default MyComponent;
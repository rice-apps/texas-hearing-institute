import { ScrollView } from 'react-native';
import Name from './components/Name';


export default function App() {
  return (
   <ScrollView>
    <Name name={"PAUL"}></Name>
    <Name name={"Shane"}></Name>
    <Name name={"West"}></Name>
   </ScrollView>
  );
}

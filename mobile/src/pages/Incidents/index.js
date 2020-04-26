import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import styles from './styles'; 

//Exportando componente
export default function Incidents(){

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const[loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Details', { incident });
  }

  async function loadIncidents() {

    if (loading){ //Enquanto o loading estiver como true
      return;

      //É necessário evitar que enquanto outra requisição seja feita mais uma requisição venha a acontecer.
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: {page}
    });

  
    setIncidents([...incidents, ...response.data]); //Anexando 2 vetores em um único vetor 
    setTotal(response.headers['x-total-count']);
    setLoading(false);
    setPage(page + 1);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text styles={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
    
      <FlatList 
        data={incidents}
        //data={[1, 2, 3, 4, 5]} //Data é os dados, o array de dado que vai montar a lista
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        //keyExtractor={incident => String(incident)} //Vai receber cada um dos incidentes e vai retornar qual que é a função única que existe em cada um dos incidentes, como no momento são números e únicos eu posso passar o proprio valorq ue existe neles, no react native eu preciso que isso seja uma string (passa construtor)
        showsVerticalScrollIndicator={false} //Remove o scroll  
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'}).format(incident.value)}
            </Text>

          <TouchableOpacity 
          style={styles.detailsButton} 
          // arrow function onPress={() => {}}
          onPress={() => navigateToDetail(incident)} //Sempre que eu quiser passar parametros para uma funcao eu coloco uma arrow function no começo
          >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
        )} //Função responsável por rederizar cada item da lista
           //Ela é uma função que vai retornar um código jsx (por isso parenteses ao invés de chaves)
      />
    </View>
  );
}
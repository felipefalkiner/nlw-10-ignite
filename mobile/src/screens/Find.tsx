import {useState} from 'react'
import { Heading, VStack, useToast } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";


export function Find(){

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPool() { 

        try {
            setIsLoading(true);

            if(!code.trim()){
                return toast.show({
                    title: 'Informe o código!',
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }

            await api.post('/pools/join', { code });

            toast.show({
                title: 'Você entrou no bolão com sucesso!',
                placement: 'top',
                bgColor: 'green.500',
            })

            setIsLoading(false);
            navigate('pools');

        } catch (error) {
            // console.log(error);
            setIsLoading(false);
            if(error.response?.data?.message === 'Bolão não encontrado!') {
                return toast.show({
                    title: error.response.data.message,
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }

            if(error.response?.data?.message === 'Você já entrou nesse bolão!') {
                return toast.show({
                    title: error.response.data.message,
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }
            
            toast.show({
                title: 'Não foi possível encontrar o bolão...',
                placement: 'top',
                bgColor: 'red.500',
            })

        }
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color={"white"} fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o nome do seu bolão?"
                    onChangeText={setCode}
                    autoCapitalize='characters'
                />

                <Button
                    title="Buscar Bolão"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>

        </VStack>
    )
}

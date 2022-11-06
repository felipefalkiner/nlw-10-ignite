import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from 'react'

import { api } from "../../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCardProps } from '../components/PoolCard'
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";

interface RouteParams {
    id: string
}

export function Details(){
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
    

    const route = useRoute();
    const { id } = route.params as RouteParams;
    const toast = useToast();

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)

        } catch (error) {
            console.log(error)

            toast.show({
                title: "Não foi possível carregar os detalhes do bolão",
                placement: 'top',
                bgColor: 'red.500'
            })
            
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPoolDetails();
    }, [id])

    if(isLoading){
        return (
            <Loading />
        )
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header
                title="Título Não Integrado"
                showBackButton
                showShareButton
            />

            {   
                poolDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails}/>

                    <HStack bgColor='gray.800' p={1} rounded="sm" mb={5}>
                        <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelected('guesses')} />
                        <Option title="Ranking do Grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected('ranking')} />
                    </HStack>
                    

                </VStack>
                :
                <EmptyMyPoolList code={poolDetails.code} />
            }
        </VStack>
    )
}

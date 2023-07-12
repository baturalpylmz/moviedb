import { Checkbox, DatePicker, Modal, Radio } from 'antd'
import React from 'react'
import { GenresInterface } from '../../Types/Type'
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Props {
    handleCancel: () => void,
    isModalOpen: boolean,
    handleOk: () => void,
    setGenres:React.Dispatch<React.SetStateAction<GenresInterface[]>>,
    genres:GenresInterface[],
    isAdult:boolean,
    setIsAdult:React.Dispatch<React.SetStateAction<boolean>>,
    video:boolean,
    setVideo:React.Dispatch<React.SetStateAction<boolean>>,
    releaseDateGte:string,
    setReleaseDateGte:React.Dispatch<React.SetStateAction<string>>,
    releaseDateLte:string,
    setReleaseDateLte:React.Dispatch<React.SetStateAction<string>>,
    language:string,
    setLanguage:React.Dispatch<React.SetStateAction<string>>,
    checkeds:string[],
    setCheckeds:React.Dispatch<React.SetStateAction<string[]>>
}

interface LanguagesInterface {
    lang:string,
    value:string
}

const ModalComponent: React.FC<Props> = ({ 
    handleCancel, isModalOpen, handleOk,setGenres,
    genres,isAdult,setIsAdult,video,setVideo,releaseDateGte,
    setReleaseDateGte,releaseDateLte,setReleaseDateLte,language,setLanguage,checkeds,setCheckeds }) => {

    const languages:LanguagesInterface[] = [ {lang:'Türkçe',value:'tr'},
                        {lang:'İngilizce',value:'en'},
                        {lang:'İspanyolca',value:'es'},
                        {lang:'Almanca',value:'de'},
                        {lang:'Fransızca',value:'fr'},
                        {lang:'İtalyanca',value:'it'},
                        {lang:'Portekizce',value:'pt'},
                        {lang:'Rusça',value:'ru'},
                        {lang:'Arapça',value:'ar'},
                        {lang:'Çince',value:'zh'},
                        {lang:'Rusça',value:'ru'},
                        {lang:'Korece',value:'ko'},
                        {lang:'Japonca',value:'ja'}
                    ]

    const changedCategory = (e: CheckboxChangeEvent) => {
        if(e.target.checked)
            setCheckeds([...checkeds ,e.target.value])
        else
            setCheckeds(checkeds.filter(checked=>checked!==e.target.value))                
    }

    const changedAdult = (e: RadioChangeEvent) => {
        setIsAdult(e.target.value)
    };

    const changedVideo = (e: RadioChangeEvent) => {
        setVideo(e.target.value)
    }

    const changedDateGte: DatePickerProps['onChange'] = (date, dateString) => {
        setReleaseDateGte(dateString);
    };

    const changedDateLte: DatePickerProps['onChange'] = (date, dateString) => {
        setReleaseDateLte(dateString);
    };

    const changedLanguage = (e: any) => {
        setLanguage(e.target.value)
    };


    return (
        <>
            <Modal title="Filtrele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="modalSection">

                    <div className="modals">
                        <span>Kategori : </span>
                            {
                                genres.map(el => {
                                    return (
                                        <Checkbox value={el.id} onChange={changedCategory}>{el.name}</Checkbox>
                                    )
                                })
                            }
                    </div>


                    <div className="modals">
                        <span>18+  : </span>
                        <Radio.Group onChange={changedAdult} defaultValue={false}>
                            <Radio value={false}>Hayır</Radio>
                            <Radio value={true}>Evet</Radio>
                        </Radio.Group>
                    </div>

                    <div className="modals">
                        <span>Video : </span>   
                        <Radio.Group onChange={changedVideo} defaultValue={true}>
                            <Radio value={true}>Bulunsun</Radio>
                            <Radio value={false}>Bulunmasın</Radio>
                        </Radio.Group>
                    </div>

                    <div className="modals">
                        <span>Yayınlanma Tarihi Aralığı : </span>   
                        <DatePicker onChange={changedDateGte} />
                        <DatePicker onChange={changedDateLte} />
                    </div>

                    <div className="modals">
                        <span>Dil : </span>
                        <select onChange={changedLanguage} defaultValue={'tr'}>
                            {
                                languages.map(el=>{
                                    return(
                                        <option value={el.value}>{el.lang}</option>
                                    )
                                })
                            }
                        </select>
                    </div>



                </div>
            </Modal>
        </>
    )
}

export default ModalComponent 

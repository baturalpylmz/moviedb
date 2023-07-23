import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import React from "react";
import { GenresInterface } from "../../Types/Type";
import type { DatePickerProps, RadioChangeEvent } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "./ModalComponent.scss";
import { Option } from "antd/es/mentions";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  handleOk: () => void;
  setGenres: React.Dispatch<React.SetStateAction<GenresInterface[]>>;
  genres: GenresInterface[];
  isAdult: boolean;
  setIsAdult: React.Dispatch<React.SetStateAction<boolean>>;
  video: boolean;
  setVideo: React.Dispatch<React.SetStateAction<boolean>>;
  releaseDateGte: string;
  setReleaseDateGte: React.Dispatch<React.SetStateAction<string>>;
  releaseDateLte: string;
  setReleaseDateLte: React.Dispatch<React.SetStateAction<string>>;
  checkeds: string[];
  setCheckeds: React.Dispatch<React.SetStateAction<string[]>>;
  sortingBy:string;
  setSortingBy:React.Dispatch<React.SetStateAction<string>>
}

interface LanguagesInterface {
  lang: string;
  value: string;
}

const ModalComponent: React.FC<Props> = ({
  handleCancel,
  isModalOpen,
  handleOk,
  setGenres,
  genres,
  isAdult,
  setIsAdult,
  video,
  setVideo,
  releaseDateGte,
  setReleaseDateGte,
  releaseDateLte,
  setReleaseDateLte,
  checkeds,
  setCheckeds,
  sortingBy,
  setSortingBy
}) => {
  const languages: LanguagesInterface[] = [
    { lang: "Türkçe", value: "tr" },
    { lang: "İngilizce", value: "en" },
    { lang: "İspanyolca", value: "es" },
    { lang: "Almanca", value: "de" },
    { lang: "Fransızca", value: "fr" },
    { lang: "İtalyanca", value: "it" },
    { lang: "Portekizce", value: "pt" },
    { lang: "Rusça", value: "ru" },
    { lang: "Arapça", value: "ar" },
    { lang: "Çince", value: "zh" },
    { lang: "Rusça", value: "ru" },
    { lang: "Korece", value: "ko" },
    { lang: "Japonca", value: "ja" },
  ];

  const changedCategory = (e: CheckboxChangeEvent) => {
    if (e.target.checked) setCheckeds([...checkeds, e.target.value]);
    else setCheckeds(checkeds.filter((checked) => checked !== e.target.value));
  };

  const changedAdult = (e: RadioChangeEvent) => {
    setIsAdult(e.target.value);
  };

  const changedVideo = (e: RadioChangeEvent) => {
    setVideo(e.target.value);
  };

  const changedDateGte: DatePickerProps["onChange"] = (date, dateString) => {
    setReleaseDateGte(dateString);
  };

  const changedDateLte: DatePickerProps["onChange"] = (date, dateString) => {
    setReleaseDateLte(dateString);
  };

  return (
    <>
      <Modal
        className="modalStyle"
        title="Filtreler"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modals">
          <span style={{ fontSize: "18px" }}>Kategori : </span>
          <div className="checkbox-area">
            {genres.map((el) => {
              return (
                <Checkbox
                  className="checkbox-elm"
                  value={el.id}
                  onChange={changedCategory}
                >
                  {el.name}
                </Checkbox>
              );
            })}
          </div>
        </div>

        <div className="modals">
          <span style={{ fontSize: "18px" }}>18+ : </span>
          <Radio.Group onChange={changedAdult} defaultValue={false}>
            <Radio value={false}>Hayır</Radio>
            <Radio value={true}>Evet</Radio>
          </Radio.Group>
        </div>

        <div className="modals">
          <span style={{ fontSize: "18px" }}>Video : </span>
          <Radio.Group onChange={changedVideo} defaultValue={true}>
            <Radio value={true}>Bulunsun</Radio>
            <Radio value={false}>Bulunmasın</Radio>
          </Radio.Group>
        </div>

        <div className="modals">
          <span style={{ fontSize: "18px" }}>Yayınlanma Tarihi Aralığı : </span>
          <DatePicker
            style={{ marginRight: "10px" }}
            onChange={changedDateGte}
          />
          <DatePicker onChange={changedDateLte} />
        </div>

        <div className="modals">
          <span style={{ fontSize: "18px" }}>Sırala : </span>
          <Select className="sorting-select" onChange={(e) => setSortingBy(e)}>
            <Option value="popularity.asc">Artan Popülerlik</Option>
            <Option value="popularity.desc">Azalan Popülerlik</Option>
            <Option value="revenue.asc">Artan Bütçe</Option>
            <Option value="revenue.desc">Azalan Bütçe</Option>
            <Option value="primary_release_date.asc">Artan Yayın Tarihi</Option>
            <Option value="primary_release_date.desc">
              Azalan Yayın Tarihi
            </Option>
            <Option value="vote_average.asc">Artan Oy Ortalaması</Option>
            <Option value="vote_average.desc">Azalan Oy Ortalaması</Option>
            <Option value="vote_count.asc">Artan Oy Sayısı</Option>
            <Option value="vote_count.desc">Azalan Oy Sayısı</Option>
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;

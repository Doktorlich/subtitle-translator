import SubtitleItem from "./SubtitleItem.tsx";
import TranslatedFileActions from "./TranslatedFileActions.tsx";
import SubtitleList from "./SubtitleList.tsx"
import classes from "../../pages/HomePage.module.css";
import Button from "../UI/ButtonItem.tsx";
import CardContainer from "../UI/CardContainer.tsx";


export default function SectionTranslatedFileSubtitleList({}) {
	return  <CardContainer title={"Storage translated files"}>
    <div className={classes["button-list"]}>
      <Button className={classes.button}>Clear All</Button>
      <Button className={classes.button}>Download All</Button>
    </div>
    {/*ТЕСТОВЫЙ ПРИМЕР*/}
    <SubtitleList>
      <SubtitleItem
        fileName={"project.fileName project.fileName project.fileName"} // Передаем имя файла в дочерний компонент
        projectId={""}
      >
        <TranslatedFileActions />
      </SubtitleItem>
    </SubtitleList>
  </CardContainer>




}
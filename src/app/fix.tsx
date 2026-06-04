/* NoteCard.tsx исправить раздел с const ActionButton (TODO):
1. button исправить на мой комппонент Button из src\shared\ui\Button\Button.tsx
2. Исправить что бы компонент не был внизу файла ( должна быть в папке ui)

! Спросить курс про переменные на степике

 разобраться с хуком из src\entities\Training\model\useTrainings.ts (useTrainings)
1. Понять нужен ли он и попробовать несколько раз написать самой, что бы разобраться в нем (нужно понимание как он работает)
2. Переписать на человеческий язык и сделать проще
! важно не сокращать t,s (прописывать полностью)

src\entities\Training\ui\TrainingCard.tsx
1. Вынести const DAYS_TRANSLATION в файл с общими типами 

! спросить как работает тайлвинг конфиг ( пример с bg) 

2. Исправить все кнопки botton на компонентные Button из файла 
3. Вынести в отдельный файл DAYS_TRANSLATION.tsx return (<div key={key} className="flex flex-col gap-1 pl-2"> ....)

3. Разобраться с дублированной логикой у файлов src\entities\Training\ui\TrainingCard.tsx и src\features\manage-template\ui\TemplateModal.tsx 
* по хорошему все констаты вынести в отельные файлы и ипортировать их и желательно interface тоже (даже если они небольшие)

Файл TemplateModal.tsx
1. Разобраться с дублированной логикой и вынести в отдельный файл TRAINING_CARD.tsx
2. Вынести в types:
const initialDayState: DayWorkout = {
  workoutName: "",
  time: "",
  exercises: [],
};
type DaysState = TrainingTemplate["days"];

3. Разобрать и обьяснить как работает функция TemplateModal и перевести ее на человеческий код
const [days, setDays] = ...

4. Подумать как лучше сделать и улучшить код в этом файле, написать более понятно и человеческим языком
*Когда перейду к этотому файлу, можно будет созвониться и проговорить и внести вместе изменения

Почитать про теги hr (Что вообще это за тег и желательно запомнить) 

5. Вынести в компонент DAYOFWEEK
<div key={day.key} className="flex flex-col gap-3 p-4 bg-[#fdfbf7] rounded-2xl border border-[#e8dfd5]/60">
                <h3 className="font-bold text-[#755d48] text-xs tracking-wider">{day.label}</h3>
                <div className="flex gap-3">
...






С чего лучше начать: 
1. Пройтись по всем обычным кнопкам button и заменить на мой компонент Button

*/
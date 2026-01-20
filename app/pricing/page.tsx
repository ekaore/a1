'use client'

import { useState, useMemo } from 'react'

interface PriceItem {
  number: string
  direction: string
  price: number
  country: string
  type: 'стационарные' | 'мобильные' | 'другие'
}

export default function PricingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const prices: PriceItem[] = [
    { number: '81081', direction: 'Япония, стационарные', price: 5.1264, country: 'Япония', type: 'стационарные' },
    { number: '81081[789]0', direction: 'Япония, мобильные', price: 19.224, country: 'Япония', type: 'мобильные' },
    { number: '81082', direction: 'Южная Корея, стационарные', price: 4.984, country: 'Южная Корея', type: 'стационарные' },
    { number: '810822[0-689]', direction: 'Южная Корея, Сеул', price: 5.696, country: 'Южная Корея', type: 'другие' },
    { number: '810372', direction: 'Эстония, стационарные', price: 4.628, country: 'Эстония', type: 'стационарные' },
    { number: '8103725', direction: 'Эстония, мобильные', price: 27.056, country: 'Эстония', type: 'мобильные' },
    { number: '81046', direction: 'Швеция, стационарные', price: 3.56, country: 'Швеция', type: 'стационарные' },
    { number: '810467[0136]', direction: 'Швеция, мобильные', price: 22.784, country: 'Швеция', type: 'мобильные' },
    { number: '81041', direction: 'Швейцария, стационарные', price: 2.9904, country: 'Швейцария', type: 'стационарные' },
    { number: '81041[78]', direction: 'Швейцария, мобильные', price: 22.784, country: 'Швейцария', type: 'мобильные' },
    { number: '810420', direction: 'Чехия, стационарные', price: 3.9872, country: 'Чехия', type: 'стационарные' },
    { number: '8104207', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '81042060', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '8104209[36]', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '8104202', direction: 'Чехия, Прага', price: 5.696, country: 'Чехия', type: 'другие' },
    { number: '810235', direction: 'Чад, стационарные', price: 79.661, country: 'Чад', type: 'стационарные' },
    { number: '810385', direction: 'Хорватия, стационарные', price: 4.272, country: 'Хорватия', type: 'стационарные' },
    { number: '81033', direction: 'Франция, стационарные', price: 3.56, country: 'Франция', type: 'стационарные' },
    { number: '810336', direction: 'Франция, мобильные', price: 21.36, country: 'Франция', type: 'мобильные' },
    { number: '810331', direction: 'Франция, Париж', price: 3.1328, country: 'Франция', type: 'другие' },
    { number: '810358', direction: 'Финляндия, стационарные', price: 5.696, country: 'Финляндия', type: 'стационарные' },
    { number: '81035850', direction: 'Финляндия, мобильные', price: 14.24, country: 'Финляндия', type: 'мобильные' },
    { number: '810380', direction: 'Украина, стационарные', price: 21.36, country: 'Украина', type: 'стационарные' },
    { number: '81038039', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '810380[569]', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '810998', direction: 'Узбекистан, стационарные', price: 18.512, country: 'Узбекистан', type: 'стационарные' },
    { number: '81090', direction: 'Турция, стационарные', price: 7.12, country: 'Турция', type: 'стационарные' },
    { number: '810905', direction: 'Турция, мобильные', price: 24.208, country: 'Турция', type: 'мобильные' },
    { number: '810993', direction: 'Туркменистан, стационарные', price: 17.088, country: 'Туркменистан', type: 'стационарные' },
    { number: '810216', direction: 'Тунис, стационарные', price: 93.869, country: 'Тунис', type: 'стационарные' },
    { number: '810886', direction: 'Тайвань, стационарные', price: 2.136, country: 'Тайвань', type: 'стационарные' },
    { number: '810992', direction: 'Таджикистан, стационарные', price: 14.24, country: 'Таджикистан', type: 'стационарные' },
    { number: '8109929[1235]', direction: 'Таджикистан, мобильные', price: 14.24, country: 'Таджикистан', type: 'мобильные' },
    { number: '810386', direction: 'Словения, стационарные', price: 4.984, country: 'Словения', type: 'стационарные' },
    { number: '810421', direction: 'Словакия, стационарные', price: 6.1232, country: 'Словакия', type: 'стационарные' },
    { number: '810381', direction: 'Сербия и Черногория, стационарные', price: 14.24, country: 'Сербия и Черногория', type: 'стационарные' },
    { number: '8103816[1-79]', direction: 'Сербия и Черногория, мобильные', price: 27.768, country: 'Сербия и Черногория', type: 'мобильные' },
    { number: '8101', direction: 'США и Канада, стационарные и мобильные', price: 2.4208, country: 'США и Канада', type: 'стационарные' },
    { number: '81040', direction: 'Румыния, стационарные', price: 9.6832, country: 'Румыния', type: 'стационарные' },
    { number: '810407[2468]', direction: 'Румыния, мобильные', price: 28.48, country: 'Румыния', type: 'мобильные' },
    { number: '8104021', direction: 'Румыния, Бухарест', price: 8.2592, country: 'Румыния', type: 'другие' },
    { number: '8', direction: 'Россия, стационарные', price: 6.408, country: 'Россия', type: 'стационарные' },
    { number: '8901100', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8901106', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8901496', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89897[012]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89896[123]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89895[012345]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898943[012345]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89894[012]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89893[789]', direction: 'Россия, мобильные Ростов обл 989', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898899', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898895[012]', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898894', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898889', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89885[678]', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898855[0123456]', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89885[134]', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '898825', direction: 'Россия, мобильные Ростов обл 988', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '896183', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '896133[012]', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8961817', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89614[0123]', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89613[012]', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89612[789]', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '896126[89]', direction: 'Россия, мобильные Ростов обл 961', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8960470', direction: 'Россия, мобильные Ростов обл 960', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89604[56]', direction: 'Россия, мобильные Ростов обл 960', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '896044[23456789]', direction: 'Россия, мобильные Ростов обл 960', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '895260', direction: 'Россия, мобильные Ростов обл 952', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89525[678]', direction: 'Россия, мобильные Ростов обл 952', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89515[123]', direction: 'Россия, мобильные Ростов обл 951', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89518[234]', direction: 'Россия, мобильные Ростов обл 951', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89508[456]', direction: 'Россия, мобильные Ростов обл 950', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '893810', direction: 'Россия, мобильные Ростов обл 938', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892982[01]', direction: 'Россия, мобильные Ростов обл 929', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892981[3456789]', direction: 'Россия, мобильные Ростов обл 929', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892980[012]', direction: 'Россия, мобильные Ростов обл 929', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892899[01]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8928988', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892896[04567]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892895[4679]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892890', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89287[567]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89286[012]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8928296', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '8928289', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892827[09]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892822[679]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '892821[2346]', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89281', direction: 'Россия, мобильные Ростов обл 928', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89198[789]', direction: 'Россия, мобильные Ростов обл 919', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89185', direction: 'Россия, мобильные Ростов обл 918', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89188[59]', direction: 'Россия, мобильные Ростов обл 918', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890944[012]', direction: 'Россия, мобильные Ростов обл 909', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89094[0123]', direction: 'Россия, мобильные Ростов обл 909', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89085[01]', direction: 'Россия, мобильные Ростов обл 908', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89081[789]', direction: 'Россия, мобильные Ростов обл 908', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890642', direction: 'Россия, мобильные Ростов обл 906', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890618[0123456]', direction: 'Россия, мобильные Ростов обл 906', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890641[456789]', direction: 'Россия, мобильные Ростов обл 906', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890645[234]', direction: 'Россия, мобильные Ростов обл 906', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890643[09]', direction: 'Россия, мобильные Ростов обл 906', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890545', direction: 'Россия, мобильные Ростов обл 905', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890548[567]', direction: 'Россия, мобильные Ростов обл 905', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890547[89]', direction: 'Россия, мобильные Ростов обл 905', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890543[0129]', direction: 'Россия, мобильные Ростов обл 905', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890542[56789]', direction: 'Россия, мобильные Ростов обл 905', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890444', direction: 'Россия, мобильные Ростов обл 904', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890434', direction: 'Россия, мобильные Ростов обл 904', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890450', direction: 'Россия, мобильные Ростов обл 904', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890346[01234]', direction: 'Россия, мобильные Ростов обл 903', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890347[01234]', direction: 'Россия, мобильные Ростов обл 903', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890340[01234567]', direction: 'Россия, мобильные Ростов обл 903', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890343', direction: 'Россия, мобильные Ростов обл 903', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '890348[5689]', direction: 'Россия, мобильные Ростов обл 903', price: 1.8, country: 'Россия', type: 'мобильные' },
    { number: '89', direction: 'Россия, мобильные', price: 3, country: 'Россия', type: 'мобильные' },
    { number: '8485', direction: 'Россия, Ярославская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '84852', direction: 'Россия, Ярославль', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '884722', direction: 'Россия, Элиста', price: 3, country: 'Россия', type: 'другие' },
    { number: '810112', direction: 'Россия, Экстренная служба 112, Таганрог', price: 0.4, country: 'Россия', type: 'другие' },
    { number: '810112', direction: 'Россия, Экстренная служба 112, Ростов-на-Дону', price: 0.65, country: 'Россия', type: 'другие' },
    { number: '8835', direction: 'Россия, Чувашия', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '8302', direction: 'Россия, Читинская область', price: 8.544, country: 'Россия', type: 'стационарные' },
    { number: '83022', direction: 'Россия, Чита', price: 4.5568, country: 'Россия', type: 'другие' },
    { number: '887822', direction: 'Россия, Черкесск', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8820', direction: 'Россия, Череповец регион', price: 3.204, country: 'Россия', type: 'другие' },
    { number: '8351', direction: 'Россия, Челябинск и область', price: 9.256, country: 'Россия', type: 'стационарные' },
    { number: '88352', direction: 'Россия, Чебоксары', price: 5.696, country: 'Россия', type: 'другие' },
    { number: '8346', direction: 'Россия, Ханты-Мансийский АО', price: 4.628, country: 'Россия', type: 'стационарные' },
    { number: '8421', direction: 'Россия, Хабаровский край', price: 5.5536, country: 'Россия', type: 'стационарные' },
    { number: '84212', direction: 'Россия, Хабаровск', price: 3.7024, country: 'Россия', type: 'другие' },
    { number: '83472', direction: 'Россия, Уфа', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8842', direction: 'Россия, Ульяновск', price: 8.544, country: 'Россия', type: 'другие' },
    { number: '8341', direction: 'Россия, Удмуртия', price: 3.916, country: 'Россия', type: 'стационарные' },
    { number: '83452', direction: 'Россия, Тюмень', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8345', direction: 'Россия, Тюменская область', price: 14.24, country: 'Россия', type: 'стационарные' },
    { number: '8487', direction: 'Россия, Тульская область', price: 4.628, country: 'Россия', type: 'стационарные' },
    { number: '84872', direction: 'Россия, Тула', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '8382', direction: 'Россия, Томская область', price: 8.544, country: 'Россия', type: 'стационарные' },
    { number: '83822', direction: 'Россия, Томск', price: 3.916, country: 'Россия', type: 'другие' },
    { number: '84822', direction: 'Россия, Тверь', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8482', direction: 'Россия, Тверская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '8843[0-9][0-9]', direction: 'Россия, Татарстан, стационарные', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '8855[0-9][0-9]', direction: 'Россия, Татарстан, стационарные', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '84752', direction: 'Россия, Тамбов', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8100', direction: 'Россия, Таганрог, Аварийные службы, Таганрог', price: 0.4, country: 'Россия', type: 'другие' },
    { number: '8101[012]', direction: 'Россия, Таганрог, Аварийные службы, Таганрог', price: 0.4, country: 'Россия', type: 'другие' },
    { number: '88212[0-9][0-9]', direction: 'Россия, Сыктывкар', price: 8.544, country: 'Россия', type: 'другие' },
    { number: '83462[0-9][0-9]', direction: 'Россия, Сургут', price: 3.33216, country: 'Россия', type: 'другие' },
    { number: '8879', direction: 'Россия, Ставропольский край, Кавминводы', price: 6.408, country: 'Россия', type: 'стационарные' },
    { number: '8865', direction: 'Россия, Ставропольский край', price: 6.408, country: 'Россия', type: 'стационарные' },
    { number: '88652', direction: 'Россия, Ставрополь', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '88622', direction: 'Россия, Сочи', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8501', direction: 'Россия, Совинтел', price: 2.2784, country: 'Россия', type: 'другие' },
    { number: '8481', direction: 'Россия, Смоленская область', price: 6.408, country: 'Россия', type: 'стационарные' },
    { number: '84812[0-9][0-9]', direction: 'Россия, Смоленск', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8845', direction: 'Россия, Саратовская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '88452', direction: 'Россия, Саратов', price: 4.628, country: 'Россия', type: 'другие' },
    { number: '88342', direction: 'Россия, Саранск', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8812', direction: 'Россия, Санкт-Петербург', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '88469[259][0-9]', direction: 'Россия, Самара', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8846310', direction: 'Россия, Самара', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '884633[0-9]', direction: 'Россия, Самара', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '88462[2467][0-9]', direction: 'Россия, Самара', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '84912', direction: 'Россия, Рязань', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '88634[346]', direction: 'Россия, Ростовская область, Таганрог, местный', price: 0.4, country: 'Россия', type: 'другие' },
    { number: '88634[346]', direction: 'Россия, Ростовская область, Таганрог', price: 2.2, country: 'Россия', type: 'другие' },
    { number: '8863[23]', direction: 'Россия, Ростовская область, Ростов-на-Дону, местный', price: 0.65, country: 'Россия', type: 'другие' },
    { number: '8863', direction: 'Россия, Ростовская область', price: 2.2, country: 'Россия', type: 'стационарные' },
    { number: '8100', direction: 'Россия, Ростов-на-Дону, Аварийные службы', price: 0.65, country: 'Россия', type: 'другие' },
    { number: '8101[012]', direction: 'Россия, Ростов-на-Дону, Аварийные службы', price: 0.65, country: 'Россия', type: 'другие' },
    { number: '8863[23]', direction: 'Россия, Ростов-на-Дону', price: 2.2, country: 'Россия', type: 'другие' },
    { number: '8811', direction: 'Россия, Псковская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '88112', direction: 'Россия, Псков', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '88142', direction: 'Россия, Петрозаводск', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '83422', direction: 'Россия, Пермь', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8342', direction: 'Россия, Пермская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '8841', direction: 'Россия, Пензенская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '88412', direction: 'Россия, Пенза', price: 4.628, country: 'Россия', type: 'другие' },
    { number: '8486', direction: 'Россия, Орловская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '8353', direction: 'Россия, Оренбургская област', price: 6.2656, country: 'Россия', type: 'стационарные' },
    { number: '83532', direction: 'Россия, Оренбург', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '84862', direction: 'Россия, Орел', price: 4.6992, country: 'Россия', type: 'другие' },
    { number: '8381', direction: 'Россия, Омская область', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '83812', direction: 'Россия, Омск', price: 8.37312, country: 'Россия', type: 'другие' },
    { number: '8383', direction: 'Россия, Новосибирская область', price: 8.544, country: 'Россия', type: 'стационарные' },
    { number: '8383[23]', direction: 'Россия, Новосибирск', price: 2.848, country: 'Россия', type: 'другие' },
    { number: '83843', direction: 'Россия, Новокузнецк', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8816', direction: 'Россия, Новгородская область', price: 4.628, country: 'Россия', type: 'стационарные' },
    { number: '88314[136]', direction: 'Россия, Нижний Новгород', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '88312', direction: 'Россия, Нижний Новгород', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '8831', direction: 'Россия, Нижегородская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '842366', direction: 'Россия, Находка', price: 5.696, country: 'Россия', type: 'другие' },
    { number: '88662', direction: 'Россия, Нальчик', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '887322', direction: 'Россия, Назрань', price: 2.9904, country: 'Россия', type: 'другие' },
    { number: '88552', direction: 'Россия, Набережные Челны', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '8815', direction: 'Россия, Мурманская область', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '88152', direction: 'Россия, Мурманск', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '849[68]]', direction: 'Россия, Московская область', price: 4.272, country: 'Россия', type: 'стационарные' },
    { number: '849[59]', direction: 'Россия, Москва', price: 2.136, country: 'Россия', type: 'другие' },
    { number: '8834', direction: 'Россия, Мордовия, стационарные', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '88772[25]', direction: 'Россия, Майкоп', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8474', direction: 'Россия, Липецкая область', price: 4.272, country: 'Россия', type: 'стационарные' },
    { number: '84742', direction: 'Россия, Липецк', price: 3.204, country: 'Россия', type: 'другие' },
    { number: '8813', direction: 'Россия, Ленинградская область', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '8471', direction: 'Россия, Курская область', price: 5.34, country: 'Россия', type: 'стационарные' },
    { number: '84712', direction: 'Россия, Курск', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '8352', direction: 'Россия, Курганская область', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '83522', direction: 'Россия, Курган', price: 5.696, country: 'Россия', type: 'другие' },
    { number: '8391', direction: 'Россия, Красноярский край', price: 10.68, country: 'Россия', type: 'стационарные' },
    { number: '83912', direction: 'Россия, Красноярск', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '8861', direction: 'Россия, Краснодарский край', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '886194[45]', direction: 'Россия, Краснодар', price: 2.9904, country: 'Россия', type: 'другие' },
    { number: '88612', direction: 'Россия, Краснодар', price: 2.9904, country: 'Россия', type: 'другие' },
    { number: '8494', direction: 'Россия, Костромская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '84942', direction: 'Россия, Кострома', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '8833', direction: 'Россия, Кировская область', price: 4.272, country: 'Россия', type: 'стационарные' },
    { number: '88332', direction: 'Россия, Киров', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '8384', direction: 'Россия, Кемеровская область', price: 7.832, country: 'Россия', type: 'стационарные' },
    { number: '83842', direction: 'Россия, Кемерово', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8814', direction: 'Россия, Карелия', price: 5, country: 'Россия', type: 'стационарные' },
    { number: '84842', direction: 'Россия, Калуга', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8847', direction: 'Россия, Калмыкия', price: 3, country: 'Россия', type: 'стационарные' },
    { number: '8401', direction: 'Россия, Калининградская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '84012', direction: 'Россия, Калининград', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '8843[25]', direction: 'Россия, Казань', price: 2.4208, country: 'Россия', type: 'другие' },
    { number: '8395', direction: 'Россия, Иркутская область', price: 2.9904, country: 'Россия', type: 'стационарные' },
    { number: '83952', direction: 'Россия, Иркутск', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '83412', direction: 'Россия, Ижевск', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8493', direction: 'Россия, Ивановская область', price: 5.696, country: 'Россия', type: 'стационарные' },
    { number: '84932', direction: 'Россия, Иваново', price: 4.984, country: 'Россия', type: 'другие' },
    { number: '8343[23]', direction: 'Россия, Екатеринбург', price: 8.9712, country: 'Россия', type: 'другие' },
    { number: '8473', direction: 'Россия, Воронежская область', price: 4.984, country: 'Россия', type: 'стационарные' },
    { number: '84732', direction: 'Россия, Воронеж', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '8817', direction: 'Россия, Вологодская область', price: 8.544, country: 'Россия', type: 'стационарные' },
    { number: '88172', direction: 'Россия, Вологда', price: 6.408, country: 'Россия', type: 'другие' },
    { number: '88443', direction: 'Россия, Волжский', price: 1.2, country: 'Россия', type: 'другие' },
    { number: '8844', direction: 'Россия, Волгоградская область', price: 2.2, country: 'Россия', type: 'стационарные' },
    { number: '88442', direction: 'Россия, Волгоград', price: 1.2, country: 'Россия', type: 'другие' },
    { number: '8492', direction: 'Россия, Владимирская область', price: 6.2656, country: 'Россия', type: 'стационарные' },
    { number: '84922', direction: 'Россия, Владимир', price: 5.696, country: 'Россия', type: 'другие' },
    { number: '88672', direction: 'Россия, Владикавказ', price: 5.696, country: 'Россия', type: 'другие' },
    { number: '84232', direction: 'Россия, Владивосток', price: 3.56, country: 'Россия', type: 'другие' },
    { number: '88162', direction: 'Россия, Великий Новгород', price: 3.204, country: 'Россия', type: 'другие' },
    { number: '8483', direction: 'Россия, Брянская область', price: 7.832, country: 'Россия', type: 'стационарные' },
    { number: '84832', direction: 'Россия, Брянск', price: 4.272, country: 'Россия', type: 'другие' },
    { number: '83953[134]', direction: 'Россия, Братск', price: 3.4176, country: 'Россия', type: 'другие' },
    { number: '84162', direction: 'Россия, Благовещенск', price: 4.1296, country: 'Россия', type: 'другие' },
    { number: '8472', direction: 'Россия, Белгородская область', price: 3.7024, country: 'Россия', type: 'стационарные' },
    { number: '84722', direction: 'Россия, Белгород', price: 2.848, country: 'Россия', type: 'другие' },
    { number: '8347', direction: 'Россия, Башкортостан', price: 7.12, country: 'Россия', type: 'стационарные' },
    { number: '83852', direction: 'Россия, Барнаул', price: 4.1296, country: 'Россия', type: 'другие' },
    { number: '88453[2346]', direction: 'Россия, Балаково', price: 6.2656, country: 'Россия', type: 'другие' },
    { number: '88512', direction: 'Россия, Астрахань', price: 3, country: 'Россия', type: 'другие' },
    { number: '8851', direction: 'Россия, Астраханская область', price: 3, country: 'Россия', type: 'стационарные' },
    { number: '8818', direction: 'Россия, Архангельская область', price: 11.392, country: 'Россия', type: 'стационарные' },
    { number: '88182', direction: 'Россия, Архангельск', price: 7.476, country: 'Россия', type: 'другие' },
    { number: '83951[56]', direction: 'Россия, Ангарск', price: 3.4176, country: 'Россия', type: 'другие' },
    { number: '8416', direction: 'Россия, Амурская область', price: 10.68, country: 'Россия', type: 'стационарные' },
    { number: '8385', direction: 'Россия, Алтайский край', price: 5, country: 'Россия', type: 'стационарные' },
    { number: '8877', direction: 'Россия, Адыгея', price: 5, country: 'Россия', type: 'стационарные' },
    { number: '83902', direction: 'Россия, Абакан', price: 5, country: 'Россия', type: 'другие' },
    { number: '780950567', direction: 'Россия, АК Победа,КЦ, платный', price: 95, country: 'Россия', type: 'другие' },
    { number: '8800', direction: 'Россия, 8800', price: 0, country: 'Россия', type: 'другие' },
    { number: '81038039', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '810380[569]', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '8103809[367]', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '8103806[3678]', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '81038057[237]', direction: 'Украина, Харьков', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '810380692', direction: 'Украина, Севастополь', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '81038048[27]', direction: 'Украина, Одесса', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '810380322', direction: 'Украина, Львов', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '81038044[245]', direction: 'Украина, Киев', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '810380623[348]', direction: 'Украина, Донецк', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '810380622[0-9]', direction: 'Украина, Донецк', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '81038056[27][0-9]', direction: 'Украина, Днепропетровск', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '8103805637', direction: 'Украина, Днепропетровск', price: 21.36, country: 'Украина', type: 'другие' },
    { number: '8109923422', direction: 'Таджикистан, Ходженд', price: 14.24, country: 'Таджикистан', type: 'другие' },
    { number: '810992372', direction: 'Таджикистан, Душанбе', price: 14.24, country: 'Таджикистан', type: 'другие' },
    { number: '81035846', direction: 'Финляндия, мобильные', price: 14.24, country: 'Финляндия', type: 'мобильные' },
    { number: '8103584[012]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '810358432', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '81035843[89]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '81035844[0-9]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '81035845[01]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '810358455[05689]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '810358457[035-9]', direction: 'Финляндия, мобильные', price: 17.088, country: 'Финляндия', type: 'мобильные' },
    { number: '810316[12][023]', direction: 'Нидерланды, мобильные - KPN', price: 28.48, country: 'Нидерланды', type: 'мобильные' },
    { number: '81031630', direction: 'Нидерланды, мобильные - KPN', price: 28.48, country: 'Нидерланды', type: 'мобильные' },
    { number: '81031660', direction: 'Нидерланды, мобильные - KPN', price: 28.48, country: 'Нидерланды', type: 'мобильные' },
    { number: '8103165[136-9]', direction: 'Нидерланды, мобильные - KPN', price: 28.48, country: 'Нидерланды', type: 'мобильные' },
    { number: '81037379[4-6]', direction: 'Молдова, мобильные', price: 28.48, country: 'Молдова', type: 'мобильные' },
    { number: '81037369[0-3]', direction: 'Молдова, мобильные', price: 28.48, country: 'Молдова', type: 'мобильные' },
    { number: '8103706[012345689]', direction: 'Литва, мобильные', price: 27.056, country: 'Литва', type: 'мобильные' },
    { number: '8103715[89]', direction: 'Латвия, мобильные', price: 21.2176, country: 'Латвия', type: 'мобильные' },
    { number: '8103718[68]', direction: 'Латвия, мобильные', price: 21.2176, country: 'Латвия', type: 'мобильные' },
    { number: '8103718[24]', direction: 'Латвия, мобильные', price: 21.2176, country: 'Латвия', type: 'мобильные' },
    { number: '8109965[0145678]', direction: 'Кыргызстан, мобильные', price: 17.8, country: 'Кыргызстан', type: 'мобильные' },
    { number: '810357700', direction: 'Кипр, мобильные', price: 7.832, country: 'Кипр', type: 'мобильные' },
    { number: '810770[01257]', direction: 'Казахстан, мобильные', price: 11.392, country: 'Казахстан', type: 'мобильные' },
    { number: '8107747', direction: 'Казахстан, мобильные', price: 11.392, country: 'Казахстан', type: 'мобильные' },
    { number: '81077182', direction: 'Казахстан, Павлодар', price: 2.848, country: 'Казахстан', type: 'другие' },
    { number: '8107336', direction: 'Казахстан, Байконур', price: 5.696, country: 'Казахстан', type: 'другие' },
    { number: '8109725', direction: 'Израиль, мобильные', price: 12.816, country: 'Израиль', type: 'мобильные' },
    { number: '8109722[013456789]', direction: 'Израиль, Иерусалим', price: 2.848, country: 'Израиль', type: 'другие' },
    { number: '81099599[1-9]', direction: 'Грузия, мобильные', price: 35.6, country: 'Грузия', type: 'мобильные' },
    { number: '81099590', direction: 'Грузия, мобильные', price: 35.6, country: 'Грузия', type: 'мобильные' },
    { number: '81099577[4-7]', direction: 'Грузия, мобильные', price: 35.6, country: 'Грузия', type: 'мобильные' },
    { number: '8103069601', direction: 'Греция, мобильные', price: 28.48, country: 'Греция', type: 'мобильные' },
    { number: '8104916[023]', direction: 'Германия, мобильные', price: 32.04, country: 'Германия', type: 'мобильные' },
    { number: '8104915[012579]', direction: 'Германия, мобильные', price: 32.04, country: 'Германия', type: 'мобильные' },
    { number: '810224', direction: 'Гвинея, стационарные', price: 61.454, country: 'Гвинея', type: 'стационарные' },
    { number: '8103599[89]', direction: 'Болгария, мобильные Globul', price: 34.176, country: 'Болгария', type: 'мобильные' },
    { number: '81035987', direction: 'Болгария, мобильные BTC', price: 32.752, country: 'Болгария', type: 'мобильные' },
    { number: '810359[89]8', direction: 'Болгария, мобильные - Mobiltel', price: 29.904, country: 'Болгария', type: 'мобильные' },
    { number: '8103248', direction: 'Бельгия, мобильные Base', price: 31.328, country: 'Бельгия', type: 'мобильные' },
    { number: '81037529[2578]', direction: 'Беларусь, мобильные MTS', price: 24.92, country: 'Беларусь', type: 'мобильные' },
    { number: '81037529[013469]', direction: 'Беларусь, мобильные', price: 44.856, country: 'Беларусь', type: 'мобильные' },
    { number: '81037525[69]', direction: 'Беларусь, мобильные', price: 44.856, country: 'Беларусь', type: 'мобильные' },
    { number: '81037544[0-9]', direction: 'Беларусь, мобильные', price: 44.856, country: 'Беларусь', type: 'мобильные' },
    { number: '8103479[0123589]', direction: 'Армения, мобильные', price: 21.36, country: 'Армения', type: 'мобильные' },
    { number: '81037447', direction: 'Армения, Нагорный Карабах', price: 21.36, country: 'Армения', type: 'другие' },
    { number: '8106119[13469][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '8106119[169][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '810614[0-9][0-9][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '8106117[127-9][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '81061180[1-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '8106118[1-9][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '8106114[04689][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '810351', direction: 'Португалия, стационарные', price: 1, country: 'Португалия', type: 'стационарные' },
    { number: '810351[69]', direction: 'Португалия, мобильные', price: 7, country: 'Португалия', type: 'мобильные' },
    { number: '81048', direction: 'Польша, стационарные', price: 3.56, country: 'Польша', type: 'стационарные' },
    { number: '8104888[0789]', direction: 'Польша, мобильные', price: 17.088, country: 'Польша', type: 'мобильные' },
    { number: '8104822', direction: 'Польша, Варшава', price: 4.272, country: 'Польша', type: 'другие' },
    { number: '81097[02][2489]2', direction: 'Палестина, стационарные', price: 25.632, country: 'Палестина', type: 'стационарные' },
    { number: '81092', direction: 'Пакистан, стационарные', price: 9.968, country: 'Пакистан', type: 'стационарные' },
    { number: '8109230[012678]', direction: 'Пакистан мобильные, Mobilink', price: 9.968, country: 'Пакистан', type: 'мобильные' },
    { number: '810968', direction: 'Оман', price: 45, country: 'Оман', type: 'стационарные' },
    { number: '810971', direction: 'Объединенные Арабские Эмираты, стационарные', price: 25.632, country: 'ОАЭ', type: 'стационарные' },
    { number: '81097150', direction: 'Объединенные Арабские Эмираты, мобильные', price: 27.056, country: 'ОАЭ', type: 'мобильные' },
    { number: '8104759', direction: 'Норвегия, мобильные - Others', price: 21.36, country: 'Норвегия', type: 'мобильные' },
    { number: '810474', direction: 'Норвегия, мобильные - Others', price: 21.36, country: 'Норвегия', type: 'мобильные' },
    { number: '810479', direction: 'Норвегия, мобильные - Others', price: 21.36, country: 'Норвегия', type: 'мобильные' },
    { number: '8104721', direction: 'Норвегия, Осло', price: 1.424, country: 'Норвегия', type: 'другие' },
    { number: '81064', direction: 'Новая Зеландия, стационарные', price: 4.272, country: 'Новая Зеландия', type: 'стационарные' },
    { number: '810642', direction: 'Новая Зеландия, мобильные', price: 17.8, country: 'Новая Зеландия', type: 'мобильные' },
    { number: '81031', direction: 'Нидерланды, стационарные', price: 3.8448, country: 'Нидерланды', type: 'стационарные' },
    { number: '81031665', direction: 'Нидерланды, мобильные - KPN', price: 28.48, country: 'Нидерланды', type: 'мобильные' },
    { number: '81095', direction: 'Мьянма стационарные', price: 42.72, country: 'Мьянма', type: 'стационарные' },
    { number: '810976', direction: 'Монголия, стационарные', price: 17.088, country: 'Монголия', type: 'стационарные' },
    { number: '8109769[69]', direction: 'Монголия, мобильные', price: 28.48, country: 'Монголия', type: 'мобильные' },
    { number: '810373', direction: 'Молдова, стационарные', price: 17.088, country: 'Молдова', type: 'стационарные' },
    { number: '81037356[27]', direction: 'Молдова, мобильные', price: 28.48, country: 'Молдова', type: 'мобильные' },
    { number: '81037322', direction: 'Молдова, Кишинев', price: 17.088, country: 'Молдова', type: 'другие' },
    { number: '810212', direction: 'Марокко, стационарные', price: 31, country: 'Марокко', type: 'стационарные' },
    { number: '810423', direction: 'Лихтенштейн, стационарные', price: 11.392, country: 'Лихтенштейн', type: 'стационарные' },
    { number: '810423[5-9]', direction: 'Лихтенштейн, мобильные', price: 53.4, country: 'Лихтенштейн', type: 'мобильные' },
    { number: '810370', direction: 'Литва, стационарные', price: 7.9744, country: 'Литва', type: 'стационарные' },
    { number: '81037067[0-8]', direction: 'Литва, мобильные', price: 27.056, country: 'Литва', type: 'мобильные' },
    { number: '810961', direction: 'Ливан, стационарные', price: 17.088, country: 'Ливан', type: 'стационарные' },
    { number: '810371', direction: 'Латвия, стационарные', price: 7.9744, country: 'Латвия', type: 'стационарные' },
    { number: '8103719[1-9]', direction: 'Латвия, мобильные', price: 21.2176, country: 'Латвия', type: 'мобильные' },
    { number: '810371[27]', direction: 'Латвия, Рига', price: 4.984, country: 'Латвия', type: 'другие' },
    { number: '810996', direction: 'Кыргызстан, стационарные', price: 17.8, country: 'Кыргызстан', type: 'стационарные' },
    { number: '81099677', direction: 'Кыргызстан, мобильные', price: 17.8, country: 'Кыргызстан', type: 'мобильные' },
    { number: '810996312', direction: 'Кыргызстан, Бишкек', price: 14.24, country: 'Кыргызстан', type: 'другие' },
    { number: '81053', direction: 'Куба, стационарные', price: 85.44, country: 'Куба', type: 'стационарные' },
    { number: '810357', direction: 'Кипр, стационарные', price: 3.56, country: 'Кипр', type: 'стационарные' },
    { number: '810357777', direction: 'Кипр, мобильные', price: 7.832, country: 'Кипр', type: 'мобильные' },
    { number: '8101204', direction: 'Канада, стационарные', price: 2.4208, country: 'Канада', type: 'стационарные' },
    { number: '810771[012345678]', direction: 'Казахстан, стационарные', price: 37.024, country: 'Казахстан', type: 'стационарные' },
    { number: '810772[123456789]', direction: 'Казахстан, стационарные', price: 8.544, country: 'Казахстан', type: 'стационарные' },
    { number: '810777[15678]', direction: 'Казахстан, мобильные', price: 11.392, country: 'Казахстан', type: 'мобильные' },
    { number: '81077232', direction: 'Казахстан, Усть-Каменогорск', price: 6.408, country: 'Казахстан', type: 'другие' },
    { number: '81077212', direction: 'Казахстан, Караганда', price: 2.136, country: 'Казахстан', type: 'другие' },
    { number: '8107727[23]', direction: 'Казахстан, Алмааты', price: 2.136, country: 'Казахстан', type: 'другие' },
    { number: '81086', direction: 'КНР (Китай), стационарные', price: 2.4208, country: 'Китай', type: 'стационарные' },
    { number: '810861[358]', direction: 'КНР (Китай), мобильные', price: 1.8512, country: 'Китай', type: 'мобильные' },
    { number: '8108610', direction: 'КНР (Китай), Пекин', price: 2.848, country: 'Китай', type: 'другие' },
    { number: '81039', direction: 'Италия, стационарные', price: 3.56, country: 'Италия', type: 'стационарные' },
    { number: '810393', direction: 'Италия, мобильные', price: 28.48, country: 'Италия', type: 'мобильные' },
    { number: '8103906', direction: 'Италия, Рим', price: 2.848, country: 'Италия', type: 'другие' },
    { number: '81034', direction: 'Испания, стационарные', price: 4.272, country: 'Испания', type: 'стационарные' },
    { number: '810346', direction: 'Испания, мобильные', price: 28.48, country: 'Испания', type: 'мобильные' },
    { number: '8103491[1-8]', direction: 'Испания, Мадрид', price: 38.448, country: 'Испания', type: 'другие' },
    { number: '81098', direction: 'Иран, стационарные', price: 17.088, country: 'Иран', type: 'стационарные' },
    { number: '8109891[1-8]', direction: 'Иран, мобильные', price: 18.512, country: 'Иран', type: 'мобильные' },
    { number: '8109821', direction: 'Иран, Тегеран', price: 12.816, country: 'Иран', type: 'другие' },
    { number: '81062', direction: 'Индонезия', price: 8, country: 'Индонезия', type: 'стационарные' },
    { number: '81091', direction: 'Индия', price: 4.984, country: 'Индия', type: 'стационарные' },
    { number: '81097[02]', direction: 'Израиль, стационарные', price: 2.848, country: 'Израиль', type: 'стационарные' },
    { number: '8109726[4-8]', direction: 'Израиль, мобильные', price: 12.816, country: 'Израиль', type: 'мобильные' },
    { number: '810995', direction: 'Грузия, стационарные', price: 42.72, country: 'Грузия', type: 'стационарные' },
    { number: '81099593[3-9]', direction: 'Грузия, мобильные', price: 35.6, country: 'Грузия', type: 'мобильные' },
    { number: '81030', direction: 'Греция, стационарные', price: 3.56, country: 'Греция', type: 'стационарные' },
    { number: '8103069[3479]', direction: 'Греция, мобильные', price: 28.48, country: 'Греция', type: 'мобильные' },
    { number: '81049', direction: 'Германия, стационарные', price: 5.34, country: 'Германия', type: 'стационарные' },
    { number: '8104917[025679]', direction: 'Германия, мобильные', price: 32.04, country: 'Германия', type: 'мобильные' },
    { number: '8104930[0-9][0-9]', direction: 'Германия, Берлин', price: 2.848, country: 'Германия', type: 'другие' },
    { number: '81084', direction: 'Вьетнам, стационарные', price: 6.408, country: 'Вьетнам', type: 'стационарные' },
    { number: '810844', direction: 'Вьетнам, Ханой', price: 6.408, country: 'Вьетнам', type: 'другие' },
    { number: '81036', direction: 'Венгрия, стационарные', price: 4.272, country: 'Венгрия', type: 'стационарные' },
    { number: '810361', direction: 'Венгрия, Будапешт', price: 4.272, country: 'Венгрия', type: 'другие' },
    { number: '81044[12][0-9]', direction: 'Великобритания, стационарные', price: 3, country: 'Великобритания', type: 'стационарные' },
    { number: '81044[789]', direction: 'Великобритания, мобильные', price: 25, country: 'Великобритания', type: 'мобильные' },
    { number: '810387', direction: 'Босния и Герцеговина, стационарные', price: 22.784, country: 'Босния и Герцеговина', type: 'стационарные' },
    { number: '810359', direction: 'Болгария, стационарные', price: 13.5, country: 'Болгария', type: 'стационарные' },
    { number: '81035989', direction: 'Болгария, мобильные Globul', price: 34.176, country: 'Болгария', type: 'мобильные' },
    { number: '8103592', direction: 'Болгария, София', price: 13.5, country: 'Болгария', type: 'другие' },
    { number: '81032', direction: 'Бельгия, стационарные', price: 3.56, country: 'Бельгия', type: 'стационарные' },
    { number: '8103247', direction: 'Бельгия, мобильные Proximus', price: 28.48, country: 'Бельгия', type: 'мобильные' },
    { number: '810375', direction: 'Беларусь, стационарные', price: 21.36, country: 'Беларусь', type: 'стационарные' },
    { number: '81037533[0-9]', direction: 'Беларусь, мобильные MTS', price: 24.92, country: 'Беларусь', type: 'мобильные' },
    { number: '81037517[235]', direction: 'Беларусь, Минск', price: 19.224, country: 'Беларусь', type: 'другие' },
    { number: '810880', direction: 'Бангладеш, стационарные', price: 14.24, country: 'Бангладеш', type: 'стационарные' },
    { number: '81093', direction: 'Афганистан, стационарные', price: 42.72, country: 'Афганистан', type: 'стационарные' },
    { number: '810374', direction: 'Армения, стационарные', price: 21.22, country: 'Армения', type: 'стационарные' },
    { number: '81037477', direction: 'Армения, мобильные', price: 26.31, country: 'Армения', type: 'мобильные' },
    { number: '81037410', direction: 'Армения, Ереван', price: 20.83, country: 'Армения', type: 'другие' },
    { number: '810355', direction: 'Албания, стационарные', price: 44.56, country: 'Албания', type: 'стационарные' },
    { number: '810994', direction: 'Азербайджан, стационарные', price: 26, country: 'Азербайджан', type: 'стационарные' },
    { number: '8109945[015]', direction: 'Азербайджан, мобильные', price: 35, country: 'Азербайджан', type: 'мобильные' },
    { number: '81099412', direction: 'Азербайджан, Баку', price: 25, country: 'Азербайджан', type: 'другие' },
    { number: '81043', direction: 'Австрия, стационарные', price: 4.272, country: 'Австрия', type: 'стационарные' },
    { number: '810436[468][048]', direction: 'Австрия, Мобильные Mobicom', price: 21.36, country: 'Австрия', type: 'мобильные' },
    { number: '81061', direction: 'Австралия, стационарные', price: 4.272, country: 'Австралия', type: 'стационарные' },
    { number: '8106115[0-9][0-9]', direction: 'Австралия, мобильные', price: 14.24, country: 'Австралия', type: 'мобильные' },
    { number: '8107840', direction: 'Абхазия, стационарные', price: 22, country: 'Абхазия', type: 'стационарные' },
    { number: '8107940', direction: 'Абхазия, мобильные', price: 28, country: 'Абхазия', type: 'мобильные' },
  ]

  const countries = useMemo(() => {
    const unique = Array.from(new Set(prices.map(p => p.country))).sort()
    return unique
  }, [])

  const filteredPrices = useMemo(() => {
    return prices.filter(price => {
      const matchesSearch = price.direction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           price.number.includes(searchQuery) ||
                           price.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCountry = selectedCountry === 'all' || price.country === selectedCountry
      const matchesType = selectedType === 'all' || price.type === selectedType
      return matchesSearch && matchesCountry && matchesType
    })
  }, [searchQuery, selectedCountry, selectedType])

  const groupedByCountry = useMemo(() => {
    const grouped: { [key: string]: PriceItem[] } = {}
    filteredPrices.forEach(price => {
      if (!grouped[price.country]) {
        grouped[price.country] = []
      }
      grouped[price.country].push(price)
    })
    return grouped
  }, [filteredPrices])

  return (
    <main className="pricing-page-main">
      <div className="pricing-page-container">
        <div className="pricing-page-header">
          <h1 className="pricing-page-title">Цены по основным направлениям</h1>
          <p className="pricing-page-subtitle">В рамках договора ИП "Григорян"</p>
        </div>

        <div className="pricing-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Поиск по стране, направлению или номеру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="filter-select"
            >
              <option value="all">Все страны</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">Все типы</option>
              <option value="стационарные">Стационарные</option>
              <option value="мобильные">Мобильные</option>
              <option value="другие">Другие</option>
            </select>
          </div>
        </div>

        <div className="pricing-results">
          <div className="results-count">
            Найдено: {filteredPrices.length} направлений
          </div>

          <div className="pricing-cards-container">
            {Object.entries(groupedByCountry).map(([country, countryPrices]) => (
              <div key={country} className="country-group">
                <h2 className="country-title">{country}</h2>
                <div className="country-prices-grid">
                  {countryPrices.map((price, index) => (
                    <div key={`${price.number}-${index}`} className="price-card">
                      <div className="price-card-header">
                        <div className="price-number">{price.number}</div>
                        <div className={`price-type-badge ${price.type}`}>
                          {price.type === 'стационарные' && '📞'}
                          {price.type === 'мобильные' && '📱'}
                          {price.type === 'другие' && '📍'}
                        </div>
                      </div>
                      <div className="price-direction">{price.direction}</div>
                      <div className="price-value">
                        <span className="price-amount">{price.price.toFixed(4)}</span>
                        <span className="price-currency">₽/мин</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

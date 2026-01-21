'use client'

import { useState, useMemo } from 'react'

interface PriceItem {
  number: string
  direction: string
  price: number
  country: string
  type: 'стационарные' | 'мобильные' | 'другие'
}

interface Tariff {
  pattern: string
  direction: string
  price: string
}

export default function PricingTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  // Импортируем данные из pricing/page.tsx - используем только часть для примера
  // В реальности лучше вынести данные в отдельный файл
  const tariffs: Tariff[] = [
    { pattern: '780950567', direction: 'Россия, АК Победа,КЦ, платный', price: '95' },
    { pattern: '8', direction: 'Россия, стационарные', price: '6.408' },
    { pattern: '8100', direction: 'Россия, Ростов-на-Дону, Аварийные службы', price: '0.65' },
    { pattern: '8100', direction: 'Россия, Таганрог, Аварийные службы, Таганрог', price: '0.4' },
    { pattern: '8101', direction: 'США и Канада, стационарные и мобильные', price: '2.4208' },
    { pattern: '810112', direction: 'Россия, Экстренная служба 112, Ростов-на-Дону', price: '0.65' },
    { pattern: '810112', direction: 'Россия, Экстренная служба 112, Таганрог', price: '0.4' },
    { pattern: '8101204', direction: 'Канада, стационарные', price: '2.4208' },
    { pattern: '8101[012]', direction: 'Россия, Ростов-на-Дону, Аварийные службы', price: '0.65' },
    { pattern: '8101[012]', direction: 'Россия, Таганрог, Аварийные службы, Таганрог', price: '0.4' },
    { pattern: '810212', direction: 'Марокко, стационарные', price: '31' },
    { pattern: '810216', direction: 'Тунис, стационарные', price: '93.869' },
    { pattern: '810224', direction: 'Гвинея, стационарные', price: '61.454' },
    { pattern: '810235', direction: 'Чад, стационарные', price: '79.661' },
    { pattern: '81030', direction: 'Греция, стационарные', price: '3.56' },
    { pattern: '8103069601', direction: 'Греция, мобильные', price: '28.48' },
    { pattern: '8103069[3479]', direction: 'Греция, мобильные', price: '28.48' },
    { pattern: '81031', direction: 'Нидерланды, стационарные', price: '3.8448' },
    { pattern: '81031630', direction: 'Нидерланды, мобильные - KPN', price: '28.48' },
    { pattern: '8103165[136-9]', direction: 'Нидерланды, мобильные - KPN', price: '28.48' },
    { pattern: '81031660', direction: 'Нидерланды, мобильные - KPN', price: '28.48' },
    { pattern: '81031665', direction: 'Нидерланды, мобильные - KPN', price: '28.48' },
    { pattern: '810316[12][023]', direction: 'Нидерланды, мобильные - KPN', price: '28.48' },
    { pattern: '81032', direction: 'Бельгия, стационарные', price: '3.56' },
    { pattern: '8103247', direction: 'Бельгия, мобильные Proximus', price: '28.48' },
    { pattern: '8103248', direction: 'Бельгия, мобильные Base', price: '31.328' },
    { pattern: '81033', direction: 'Франция, стационарные', price: '3.56' },
    { pattern: '810331', direction: 'Франция, Париж', price: '3.1328' },
    { pattern: '810336', direction: 'Франция, мобильные', price: '21.36' },
    { pattern: '81034', direction: 'Испания, стационарные', price: '4.272' },
    { pattern: '810346', direction: 'Испания, мобильные', price: '28.48' },
    { pattern: '8103479[0123589]', direction: 'Армения, мобильные', price: '21.36' },
    { pattern: '8103491[1-8]', direction: 'Испания, Мадрид', price: '38.448' },
    { pattern: '810351', direction: 'Португалия, стационарные', price: '1' },
    { pattern: '8103511[68]', direction: 'Португалия, мобильные', price: '7' },
    { pattern: '810351[69]', direction: 'Португалия, мобильные', price: '7' },
    { pattern: '810355', direction: 'Албания, стационарные', price: '44.56' },
    { pattern: '810357', direction: 'Кипр, стационарные', price: '3.56' },
    { pattern: '810357700', direction: 'Кипр, мобильные', price: '7.832' },
    { pattern: '810357777', direction: 'Кипр, мобильные', price: '7.832' },
    { pattern: '810358', direction: 'Финляндия, стационарные', price: '5.696' },
    { pattern: '810358432', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '81035843[89]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '81035844[0-9]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '810358455[05689]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '810358457[035-9]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '81035845[01]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '81035846', direction: 'Финляндия, мобильные', price: '14.24' },
    { pattern: '8103584[012]', direction: 'Финляндия, мобильные', price: '17.088' },
    { pattern: '81035850', direction: 'Финляндия, мобильные', price: '14.24' },
    { pattern: '810359', direction: 'Болгария, стационарные', price: '13.5' },
    { pattern: '8103592', direction: 'Болгария, София', price: '13.5' },
    { pattern: '81035987', direction: 'Болгария, мобильные BTC', price: '32.752' },
    { pattern: '81035989', direction: 'Болгария, мобильные Globul', price: '34.176' },
    { pattern: '8103599[89]', direction: 'Болгария, мобильные Globul', price: '34.176' },
    { pattern: '810359[89]8', direction: 'Болгария, мобильные - Mobiltel', price: '29.904' },
    { pattern: '81036', direction: 'Венгрия, стационарные', price: '4.272' },
    { pattern: '810361', direction: 'Венгрия, Будапешт', price: '4.272' },
    { pattern: '810370', direction: 'Литва, стационарные', price: '7.9744' },
    { pattern: '81037067[0-8]', direction: 'Литва, мобильные', price: '27.056' },
    { pattern: '8103706[012345689]', direction: 'Литва, мобильные', price: '27.056' },
    { pattern: '810371', direction: 'Латвия, стационарные', price: '7.9744' },
    { pattern: '8103715[89]', direction: 'Латвия, мобильные', price: '21.2176' },
    { pattern: '8103718[24]', direction: 'Латвия, мобильные', price: '21.2176' },
    { pattern: '8103718[68]', direction: 'Латвия, мобильные', price: '21.2176' },
    { pattern: '8103719[1-9]', direction: 'Латвия, мобильные', price: '21.2176' },
    { pattern: '810371[27]', direction: 'Латвия, Рига', price: '4.984' },
    { pattern: '810372', direction: 'Эстония, стационарные', price: '4.628' },
    { pattern: '8103725', direction: 'Эстония, мобильные', price: '27.056' },
    { pattern: '810373', direction: 'Молдова, стационарные', price: '17.088' },
    { pattern: '81037322', direction: 'Молдова, Кишинев', price: '17.088' },
    { pattern: '81037356[27]', direction: 'Молдова, мобильные', price: '28.48' },
    { pattern: '81037369[0-3]', direction: 'Молдова, мобильные', price: '28.48' },
    { pattern: '81037379[4-6]', direction: 'Молдова, мобильные', price: '28.48' },
    { pattern: '810374', direction: 'Армения, стационарные', price: '21.22' },
    { pattern: '81037410', direction: 'Армения, Ереван', price: '20.83' },
    { pattern: '81037447', direction: 'Армения, Нагорный Карабах', price: '21.36' },
    { pattern: '81037477', direction: 'Армения, мобильные', price: '26.31' },
    { pattern: '810375', direction: 'Беларусь, стационарные', price: '21.36' },
    { pattern: '81037517[235]', direction: 'Беларусь, Минск', price: '19.224' },
    { pattern: '81037525[69]', direction: 'Беларусь, мобильные', price: '44.856' },
    { pattern: '81037529[013469]', direction: 'Беларусь, мобильные', price: '44.856' },
    { pattern: '81037529[2578]', direction: 'Беларусь, мобильные MTS', price: '24.92' },
    { pattern: '81037533[0-9]', direction: 'Беларусь, мобильные MTS', price: '24.92' },
    { pattern: '81037544[0-9]', direction: 'Беларусь, мобильные', price: '44.856' },
    { pattern: '810381', direction: 'Сербия и Черногория, стационарные', price: '14.24' },
    { pattern: '8103816[1-79]', direction: 'Сербия и Черногория, мобильные', price: '27.768' },
    { pattern: '810385', direction: 'Хорватия, стационарные', price: '4.272' },
    { pattern: '810386', direction: 'Словения, стационарные', price: '4.984' },
    { pattern: '810387', direction: 'Босния и Герцеговина, стационарные', price: '22.784' },
    { pattern: '81039', direction: 'Италия, стационарные', price: '3.56' },
    { pattern: '8103906', direction: 'Италия, Рим', price: '2.848' },
    { pattern: '810393', direction: 'Италия, мобильные', price: '28.48' },
    { pattern: '81040', direction: 'Румыния, стационарные', price: '9.6832' },
    { pattern: '8104021', direction: 'Румыния, Бухарест', price: '8.2592' },
    { pattern: '810407[2468]', direction: 'Румыния, мобильные', price: '28.48' },
    { pattern: '81041', direction: 'Швейцария, стационарные', price: '2.9904' },
    { pattern: '81041[78]', direction: 'Швейцария, мобильные', price: '22.784' },
    { pattern: '810420', direction: 'Чехия, стационарные', price: '3.9872' },
    { pattern: '8104202', direction: 'Чехия, Прага', price: '5.696' },
    { pattern: '81042060', direction: 'Чехия, мобильные', price: '22.784' },
    { pattern: '8104207', direction: 'Чехия, мобильные', price: '22.784' },
    { pattern: '8104209[36]', direction: 'Чехия, мобильные', price: '22.784' },
    { pattern: '810421', direction: 'Словакия, стационарные', price: '6.1232' },
    { pattern: '810423', direction: 'Лихтенштейн, стационарные', price: '11.392' },
    { pattern: '810423[5-9]', direction: 'Лихтенштейн, мобильные', price: '53.4' },
    { pattern: '81043', direction: 'Австрия, стационарные', price: '4.272' },
    { pattern: '810436[468][048]', direction: 'Австрия, Мобильные Mobicom', price: '21.36' },
    { pattern: '81044[12][0-9]', direction: 'Великобритания, стационарные', price: '3' },
    { pattern: '81044[789]', direction: 'Великобритания, мобильные', price: '25' },
    { pattern: '81046', direction: 'Швеция, стационарные', price: '3.56' },
    { pattern: '810467[0136]', direction: 'Швеция, мобильные', price: '22.784' },
    { pattern: '8104721', direction: 'Норвегия, Осло', price: '1.424' },
    { pattern: '810474', direction: 'Норвегия, мобильные - Others', price: '21.36' },
    { pattern: '8104759', direction: 'Норвегия, мобильные - Others', price: '21.36' },
    { pattern: '810479', direction: 'Норвегия, мобильные - Others', price: '21.36' },
    { pattern: '81048', direction: 'Польша, стационарные', price: '3.56' },
    { pattern: '8104822', direction: 'Польша, Варшава', price: '4.272' },
    { pattern: '8104866[013]', direction: 'Польша, мобильные', price: '17.088' },
    { pattern: '8104888[0789]', direction: 'Польша, мобильные', price: '17.088' },
    { pattern: '81048[56]0', direction: 'Польша, мобильные', price: '17.088' },
    { pattern: '81049', direction: 'Германия, стационарные', price: '5.34' },
    { pattern: '8104915[012579]', direction: 'Германия, мобильные', price: '32.04' },
    { pattern: '8104916[023]', direction: 'Германия, мобильные', price: '32.04' },
    { pattern: '8104917[025679]', direction: 'Германия, мобильные', price: '32.04' },
    { pattern: '8104930[0-9][0-9]', direction: 'Германия, Берлин', price: '2.848' },
    { pattern: '81053', direction: 'Куба, стационарные', price: '85.44' },
    { pattern: '81061', direction: 'Австралия, стационарные', price: '4.272' },
    { pattern: '8106114[04689][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '8106115[0-9][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '8106117[127-9][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '81061180[1-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '8106118[1-9][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '8106119[13469][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '8106119[169][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '810614[0-9][0-9][0-9]', direction: 'Австралия, мобильные', price: '14.24' },
    { pattern: '81062', direction: 'Индонезия', price: '8' },
    { pattern: '81064', direction: 'Новая Зеландия, стационарные', price: '4.272' },
    { pattern: '810642', direction: 'Новая Зеландия, мобильные', price: '17.8' },
    { pattern: '8107336', direction: 'Казахстан, Байконур', price: '5.696' },
    { pattern: '810770[01257]', direction: 'Казахстан, мобильные', price: '11.392' },
    { pattern: '81077182', direction: 'Казахстан, Павлодар', price: '2.848' },
    { pattern: '810771[012345678]', direction: 'Казахстан, стационарные', price: '37.024' },
    { pattern: '81077212', direction: 'Казахстан, Караганда', price: '2.136' },
    { pattern: '81077232', direction: 'Казахстан, Усть-Каменогорск', price: '6.408' },
    { pattern: '8107727[23]', direction: 'Казахстан, Алмааты', price: '2.136' },
    { pattern: '810772[123456789]', direction: 'Казахстан, стационарные', price: '8.544' },
    { pattern: '8107747', direction: 'Казахстан, мобильные', price: '11.392' },
    { pattern: '810777[15678]', direction: 'Казахстан, мобильные', price: '11.392' },
    { pattern: '8107840', direction: 'Абхазия, стационарные', price: '22' },
    { pattern: '8107940', direction: 'Абхазия, мобильные', price: '28' },
    { pattern: '81081', direction: 'Япония, стационарные', price: '5.1264' },
    { pattern: '81081[789]0', direction: 'Япония, мобильные', price: '19.224' },
    { pattern: '81082', direction: 'Южная Корея, стационарные', price: '4.984' },
    { pattern: '810822[0-689]', direction: 'Южная Корея, Сеул', price: '5.696' },
    { pattern: '81084', direction: 'Вьетнам, стационарные', price: '6.408' },
    { pattern: '810844', direction: 'Вьетнам, Ханой', price: '6.408' },
    { pattern: '81086', direction: 'КНР (Китай), стационарные', price: '2.4208' },
    { pattern: '8108610', direction: 'КНР (Китай), Пекин', price: '2.848' },
    { pattern: '810861[358]', direction: 'КНР (Китай), мобильные', price: '1.8512' },
    { pattern: '810880', direction: 'Бангладеш, стационарные', price: '14.24' },
    { pattern: '810886', direction: 'Тайвань, стационарные', price: '2.136' },
    { pattern: '81090', direction: 'Турция, стационарные', price: '7.12' },
    { pattern: '810905', direction: 'Турция, мобильные', price: '24.208' },
    { pattern: '81091', direction: 'Индия', price: '4.984' },
    { pattern: '81092', direction: 'Пакистан, стационарные', price: '9.968' },
    { pattern: '8109230[012678]', direction: 'Пакистан мобильные, Mobilink', price: '9.968' },
    { pattern: '81093', direction: 'Афганистан, стационарные', price: '42.72' },
    { pattern: '81095', direction: 'Мьянма стационарные', price: '42.72' },
    { pattern: '810961', direction: 'Ливан, стационарные', price: '17.088' },
    { pattern: '810968', direction: 'Оман', price: '45' },
    { pattern: '810971', direction: 'Объединенные Арабские Эмираты, стационарные', price: '25.632' },
    { pattern: '81097150', direction: 'Объединенные Арабские Эмираты, мобильные', price: '27.056' },
    { pattern: '8109722[013456789]', direction: 'Израиль, Иерусалим', price: '2.848' },
    { pattern: '8109725', direction: 'Израиль, мобильные', price: '12.816' },
    { pattern: '8109726[4-8]', direction: 'Израиль, мобильные', price: '12.816' },
    { pattern: '810976', direction: 'Монголия, стационарные', price: '17.088' },
    { pattern: '8109769[69]', direction: 'Монголия, мобильные', price: '28.48' },
    { pattern: '81097[02]', direction: 'Израиль, стационарные', price: '2.848' },
    { pattern: '81097[02][2489]2', direction: 'Палестина, стационарные', price: '25.632' },
    { pattern: '81098', direction: 'Иран, стационарные', price: '17.088' },
    { pattern: '8109821', direction: 'Иран, Тегеран', price: '12.816' },
    { pattern: '8109891[1-8]', direction: 'Иран, мобильные', price: '18.512' },
    { pattern: '8109893[1245]', direction: 'Иран, мобильные', price: '18.512' },
    { pattern: '810992', direction: 'Таджикистан, стационарные', price: '14.24' },
    { pattern: '8109923422', direction: 'Таджикистан, Ходженд', price: '14.24' },
    { pattern: '810992372', direction: 'Таджикистан, Душанбе', price: '14.24' },
    { pattern: '8109929[1235]', direction: 'Таджикистан, мобильные', price: '14.24' },
    { pattern: '810993', direction: 'Туркменистан, стационарные', price: '17.088' },
    { pattern: '810994', direction: 'Азербайджан, стационарные', price: '26' },
    { pattern: '81099412', direction: 'Азербайджан, Баку', price: '25' },
    { pattern: '8109945[015]', direction: 'Азербайджан, мобильные', price: '35' },
    { pattern: '810995', direction: 'Грузия, стационарные', price: '42.72' },
    { pattern: '81099577[4-7]', direction: 'Грузия, мобильные', price: '35.6' },
    { pattern: '81099590', direction: 'Грузия, мобильные', price: '35.6' },
    { pattern: '81099593[3-9]', direction: 'Грузия, мобильные', price: '35.6' },
    { pattern: '81099599[1-9]', direction: 'Грузия, мобильные', price: '35.6' },
    { pattern: '810996', direction: 'Кыргызстан, стационарные', price: '17.8' },
    { pattern: '810996312', direction: 'Кыргызстан, Бишкек', price: '14.24' },
    { pattern: '8109965[0145678]', direction: 'Кыргызстан, мобильные', price: '17.8' },
    { pattern: '81099677', direction: 'Кыргызстан, мобильные', price: '17.8' },
    { pattern: '810998', direction: 'Узбекистан, стационарные', price: '18.512' },
    // Российские регионы
    { pattern: '8302', direction: 'Россия, Читинская область', price: '8.544' },
    { pattern: '83022', direction: 'Россия, Чита', price: '4.5568' },
    { pattern: '8341', direction: 'Россия, Удмуртия', price: '3.916' },
    { pattern: '83412', direction: 'Россия, Ижевск', price: '4.272' },
    { pattern: '8342', direction: 'Россия, Пермская область', price: '5.696' },
    { pattern: '83422', direction: 'Россия, Пермь', price: '4.272' },
    { pattern: '8343[23]', direction: 'Россия, Екатеринбург', price: '8.9712' },
    { pattern: '8345', direction: 'Россия, Тюменская область', price: '14.24' },
    { pattern: '83452', direction: 'Россия, Тюмень', price: '6.408' },
    { pattern: '8346', direction: 'Россия, Ханты-Мансийский АО', price: '4.62' },
    { pattern: '83462[0-9][0-9]', direction: 'Россия, Сургут', price: '3.33216' },
    { pattern: '8347', direction: 'Россия, Башкортостан', price: '7.12' },
    { pattern: '83472', direction: 'Россия, Уфа', price: '4.272' },
    { pattern: '8351', direction: 'Россия, Челябинск и область', price: '9.256' },
    { pattern: '8352', direction: 'Россия, Курганская область', price: '7.12' },
    { pattern: '83522', direction: 'Россия, Курган', price: '5.696' },
    { pattern: '8353', direction: 'Россия, Оренбургская област', price: '6.2656' },
    { pattern: '83532', direction: 'Россия, Оренбург', price: '4.272' },
    { pattern: '8381', direction: 'Россия, Омская область', price: '7.12' },
    { pattern: '83812', direction: 'Россия, Омск', price: '8.37312' },
    { pattern: '8382', direction: 'Россия, Томская область', price: '8.544' },
    { pattern: '83822', direction: 'Россия, Томск', price: '3.916' },
    { pattern: '8383', direction: 'Россия, Новосибирская область', price: '8.544' },
    { pattern: '8383[23]', direction: 'Россия, Новосибирск', price: '2.848' },
    { pattern: '8384', direction: 'Россия, Кемеровская область', price: '7.832' },
    { pattern: '83842', direction: 'Россия, Кемерово', price: '6.408' },
    { pattern: '83843', direction: 'Россия, Новокузнецк', price: '4.272' },
    { pattern: '8385', direction: 'Россия, Алтайский край', price: '5' },
    { pattern: '83852', direction: 'Россия, Барнаул', price: '4.1296' },
    { pattern: '83902', direction: 'Россия, Абакан', price: '5' },
    { pattern: '8391', direction: 'Россия, Красноярский край', price: '10.68' },
    { pattern: '83953[134]', direction: 'Россия, Братск', price: '3.4176' },
    { pattern: '83912', direction: 'Россия, Красноярск', price: '3.56' },
    { pattern: '8395', direction: 'Россия, Иркутская область', price: '2.9904' },
    { pattern: '83951[56]', direction: 'Россия, Ангарск', price: '3.4176' },
    { pattern: '83952', direction: 'Россия, Иркутск', price: '3.56' },
    { pattern: '8401', direction: 'Россия, Калининградская область', price: '5.696' },
    { pattern: '84012', direction: 'Россия, Калининград', price: '6.408' },
    { pattern: '8416', direction: 'Россия, Амурская область', price: '10.68' },
    { pattern: '84162', direction: 'Россия, Благовещенск', price: '4.1296' },
    { pattern: '8421', direction: 'Россия, Хабаровский край', price: '5.5536' },
    { pattern: '84212', direction: 'Россия, Хабаровск', price: '3.7024' },
    { pattern: '8423', direction: 'Россия, Приморский край', price: '3.56' },
    { pattern: '84232', direction: 'Россия, Владивосток', price: '3.56' },
    { pattern: '842366', direction: 'Россия, Находка', price: '5.696' },
    { pattern: '8471', direction: 'Россия, Курская область', price: '5.34' },
    { pattern: '84712', direction: 'Россия, Курск', price: '4.984' },
    { pattern: '8472', direction: 'Россия, Белгородская область', price: '3.7024' },
    { pattern: '84722', direction: 'Россия, Белгород', price: '2.848' },
    { pattern: '8473', direction: 'Россия, Воронежская область', price: '4.984' },
    { pattern: '84732', direction: 'Россия, Воронеж', price: '4.272' },
    { pattern: '8474', direction: 'Россия, Липецкая область', price: '4.272' },
    { pattern: '84742', direction: 'Россия, Липецк', price: '3.204' },
    { pattern: '84752', direction: 'Россия, Тамбов', price: '6.408' },
    { pattern: '8481', direction: 'Россия, Смоленская область', price: '6.408' },
    { pattern: '84812[0-9][0-9]', direction: 'Россия, Смоленск', price: '6.408' },
    { pattern: '8482', direction: 'Россия, Тверская область', price: '4.984' },
    { pattern: '84822', direction: 'Россия, Тверь', price: '4.272' },
    { pattern: '8483', direction: 'Россия, Брянская область', price: '7.832' },
    { pattern: '84832', direction: 'Россия, Брянск', price: '4.272' },
    { pattern: '84842', direction: 'Россия, Калуга', price: '6.408' },
    { pattern: '8485', direction: 'Россия, Ярославская область', price: '4.984' },
    { pattern: '84852', direction: 'Россия, Ярославль', price: '4.272' },
    { pattern: '8486', direction: 'Россия, Орловская область', price: '4.984' },
    { pattern: '84862', direction: 'Россия, Орел', price: '4.6992' },
    { pattern: '8487', direction: 'Россия, Тульская область', price: '4.62' },
    { pattern: '84872', direction: 'Россия, Тула', price: '3.56' },
    { pattern: '84912', direction: 'Россия, Рязань', price: '4.272' },
    { pattern: '8492', direction: 'Россия, Владимирская область', price: '6.2656' },
    { pattern: '84922', direction: 'Россия, Владимир', price: '5.696' },
    { pattern: '8493', direction: 'Россия, Ивановская область', price: '5.696' },
    { pattern: '84932', direction: 'Россия, Иваново', price: '4.984' },
    { pattern: '8494', direction: 'Россия, Костромская область', price: '5.696' },
    { pattern: '84942', direction: 'Россия, Кострома', price: '4.984' },
    { pattern: '849[59]', direction: 'Россия, Москва', price: '2.136' },
    { pattern: '849[68]', direction: 'Россия, Московская область', price: '4.272' },
    { pattern: '8501', direction: 'Россия, Совинтел', price: '2.2784' },
    { pattern: '8800', direction: 'Россия, 8800', price: '0' },
    { pattern: '8811', direction: 'Россия, Псковская область', price: '5.696' },
    { pattern: '88112', direction: 'Россия, Псков', price: '4.984' },
    { pattern: '8812', direction: 'Россия, Санкт-Петербург', price: '4.272' },
    { pattern: '8813', direction: 'Россия, Ленинградская область', price: '7.12' },
    { pattern: '8814', direction: 'Россия, Карелия', price: '5' },
    { pattern: '88142', direction: 'Россия, Петрозаводск', price: '4.984' },
    { pattern: '8815', direction: 'Россия, Мурманская область', price: '7.12' },
    { pattern: '88152', direction: 'Россия, Мурманск', price: '4.984' },
    { pattern: '8816', direction: 'Россия, Новгородская область', price: '4.628' },
    { pattern: '88162', direction: 'Россия, Великий Новгород', price: '3.204' },
    { pattern: '8817', direction: 'Россия, Вологодская область', price: '8.544' },
    { pattern: '88172', direction: 'Россия, Вологда', price: '6.408' },
    { pattern: '8818', direction: 'Россия, Архангельская область', price: '11.392' },
    { pattern: '88182', direction: 'Россия, Архангельск', price: '7.476' },
    { pattern: '8820', direction: 'Россия, Череповец регион', price: '3.204' },
    { pattern: '88212[0-9][0-9]', direction: 'Россия, Сыктывкар', price: '8.544' },
    { pattern: '8831', direction: 'Россия, Нижегородская область', price: '4.984' },
    { pattern: '88312', direction: 'Россия, Нижний Новгород', price: '3.56' },
    { pattern: '88314[136]', direction: 'Россия, Нижний Новгород', price: '3.56' },
    { pattern: '8833', direction: 'Россия, Кировская область', price: '4.272' },
    { pattern: '88332', direction: 'Россия, Киров', price: '3.56' },
    { pattern: '8834', direction: 'Россия, Мордовия, стационарные', price: '4.984' },
    { pattern: '88342', direction: 'Россия, Саранск', price: '4.272' },
    { pattern: '8835', direction: 'Россия, Чувашия', price: '7.12' },
    { pattern: '88352', direction: 'Россия, Чебоксары', price: '5.696' },
    { pattern: '8841', direction: 'Россия, Пензенская область', price: '4.984' },
    { pattern: '88412', direction: 'Россия, Пенза', price: '4.62' },
    { pattern: '8842', direction: 'Россия, Ульяновск', price: '8.544' },
    { pattern: '8843[0-9][0-9]', direction: 'Россия, Татарстан, стационарные', price: '7.12' },
    { pattern: '8843[25]', direction: 'Россия, Казань', price: '2.4208' },
    { pattern: '8844', direction: 'Россия, Волгоградская область', price: '2.2' },
    { pattern: '88442', direction: 'Россия, Волгоград', price: '1.2' },
    { pattern: '88443', direction: 'Россия, Волжский', price: '1.2' },
    { pattern: '8845', direction: 'Россия, Саратовская область', price: '5.696' },
    { pattern: '88452', direction: 'Россия, Саратов', price: '4.62' },
    { pattern: '88453[2346]', direction: 'Россия, Балаково', price: '6.2656' },
    { pattern: '88462[2467][0-9]', direction: 'Россия, Самара', price: '4.272' },
    { pattern: '8846310', direction: 'Россия, Самара', price: '4.272' },
    { pattern: '884633[0-9]', direction: 'Россия, Самара', price: '4.272' },
    { pattern: '88469[259][0-9]', direction: 'Россия, Самара', price: '4.272' },
    { pattern: '8847', direction: 'Россия, Калмыкия', price: '3' },
    { pattern: '884722', direction: 'Россия, Элиста', price: '3' },
    { pattern: '8851', direction: 'Россия, Астраханская область', price: '3' },
    { pattern: '88512', direction: 'Россия, Астрахань', price: '3' },
    { pattern: '88552', direction: 'Россия, Набережные Челны', price: '4.984' },
    { pattern: '8855[0-9][0-9]', direction: 'Россия, Татарстан, стационарные', price: '7.12' },
    { pattern: '8861', direction: 'Россия, Краснодарский край', price: '4.984' },
    { pattern: '88612', direction: 'Россия, Краснодар', price: '2.9904' },
    { pattern: '886194[45]', direction: 'Россия, Краснодар', price: '2.9904' },
    { pattern: '88622', direction: 'Россия, Сочи', price: '6.408' },
    { pattern: '8863', direction: 'Россия, Ростовская область', price: '2.2' },
    { pattern: '88634[346]', direction: 'Россия, Ростовская область, Таганрог', price: '2.2' },
    { pattern: '88634[346]', direction: 'Россия, Ростовская область, Таганрог, местный', price: '0.4' },
    { pattern: '8863[23]', direction: 'Россия, Ростов-на-Дону', price: '2.2' },
    { pattern: '8863[23]', direction: 'Россия, Ростовская область, Ростов-на-Дону, местный', price: '0.65' },
    { pattern: '8865', direction: 'Россия, Ставропольский край', price: '6.408' },
    { pattern: '88652', direction: 'Россия, Ставрополь', price: '6.408' },
    { pattern: '88662', direction: 'Россия, Нальчик', price: '4.272' },
    { pattern: '88672', direction: 'Россия, Владикавказ', price: '5.696' },
    { pattern: '887322', direction: 'Россия, Назрань', price: '2.9904' },
    { pattern: '8877', direction: 'Россия, Адыгея', price: '5' },
    { pattern: '88772[25]', direction: 'Россия, Майкоп', price: '6.408' },
    { pattern: '887822', direction: 'Россия, Черкесск', price: '6.408' },
    { pattern: '8879', direction: 'Россия, Ставропольский край, Кавминводы', price: '6.408' },
    { pattern: '89', direction: 'Россия, мобильные', price: '3' },
    { pattern: '8901100', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: '1.8' },
    { pattern: '8901106', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: '1.8' },
    { pattern: '8901496', direction: 'Россия, мобильные ЮФО, Скай Линк 901', price: '1.8' },
    { pattern: '890340[01234567]', direction: 'Россия, мобильные Ростов обл 903', price: '1.8' },
    { pattern: '890343', direction: 'Россия, мобильные Ростов обл 903', price: '1.8' },
    { pattern: '890346[01234]', direction: 'Россия, мобильные Ростов обл 903', price: '1.8' },
    { pattern: '890347[01234]', direction: 'Россия, мобильные Ростов обл 903', price: '1.8' },
    { pattern: '890348[5689]', direction: 'Россия, мобильные Ростов обл 903', price: '1.8' },
    { pattern: '890434', direction: 'Россия, мобильные Ростов обл 904', price: '1.8' },
    { pattern: '890444', direction: 'Россия, мобильные Ростов обл 904', price: '1.8' },
    { pattern: '890450', direction: 'Россия, мобильные Ростов обл 904', price: '1.8' },
    { pattern: '890542[56789]', direction: 'Россия, мобильные Ростов обл 905', price: '1.8' },
    { pattern: '890543[0129]', direction: 'Россия, мобильные Ростов обл 905', price: '1.8' },
    { pattern: '890545', direction: 'Россия, мобильные Ростов обл 905', price: '1.8' },
    { pattern: '890547[89]', direction: 'Россия, мобильные Ростов обл 905', price: '1.8' },
    { pattern: '890548[567]', direction: 'Россия, мобильные Ростов обл 905', price: '1.8' },
    { pattern: '890618[0123456]', direction: 'Россия, мобильные Ростов обл 906', price: '1.8' },
    { pattern: '890641[456789]', direction: 'Россия, мобильные Ростов обл 906', price: '1.8' },
    { pattern: '890642', direction: 'Россия, мобильные Ростов обл 906', price: '1.8' },
    { pattern: '890643[09]', direction: 'Россия, мобильные Ростов обл 906', price: '1.8' },
    { pattern: '890645[234]', direction: 'Россия, мобильные Ростов обл 906', price: '1.8' },
    { pattern: '89081[789]', direction: 'Россия, мобильные Ростов обл 908', price: '1.8' },
    { pattern: '89085[01]', direction: 'Россия, мобильные Ростов обл 908', price: '1.8' },
    { pattern: '890944[012]', direction: 'Россия, мобильные Ростов обл 909', price: '1.8' },
    { pattern: '89094[0123]', direction: 'Россия, мобильные Ростов обл 909', price: '1.8' },
    { pattern: '89185', direction: 'Россия, мобильные Ростов обл 918', price: '1.8' },
    { pattern: '89188[59]', direction: 'Россия, мобильные Ростов обл 918', price: '1.8' },
    { pattern: '89198[789]', direction: 'Россия, мобильные Ростов обл 919', price: '1.8' },
    { pattern: '89281', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892821[2346]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892822[679]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892827[09]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '8928289', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '8928296', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '89286[012]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '89287[567]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892890', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892895[4679]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892896[04567]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '8928988', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892899[01]', direction: 'Россия, мобильные Ростов обл 928', price: '1.8' },
    { pattern: '892980[012]', direction: 'Россия, мобильные Ростов обл 929', price: '1.8' },
    { pattern: '892981[3456789]', direction: 'Россия, мобильные Ростов обл 929', price: '1.8' },
    { pattern: '892982[01]', direction: 'Россия, мобильные Ростов обл 929', price: '1.8' },
    { pattern: '893810', direction: 'Россия, мобильные Ростов обл 938', price: '1.8' },
    { pattern: '89508[456]', direction: 'Россия, мобильные Ростов обл 950', price: '1.8' },
    { pattern: '89515[123]', direction: 'Россия, мобильные Ростов обл 951', price: '1.8' },
    { pattern: '89518[234]', direction: 'Россия, мобильные Ростов обл 951', price: '1.8' },
    { pattern: '89525[678]', direction: 'Россия, мобильные Ростов обл 952', price: '1.8' },
    { pattern: '895260', direction: 'Россия, мобильные Ростов обл 952', price: '1.8' },
    { pattern: '896044[23456789]', direction: 'Россия, мобильные Ростов обл 960', price: '1.8' },
    { pattern: '8960470', direction: 'Россия, мобильные Ростов обл 960', price: '1.8' },
    { pattern: '89604[56]', direction: 'Россия, мобильные Ростов обл 960', price: '1.8' },
    { pattern: '896126[89]', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '89612[789]', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '896133[012]', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '89613[012]', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '89614[0123]', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '8961817', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '896183', direction: 'Россия, мобильные Ростов обл 961', price: '1.8' },
    { pattern: '898825', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '898855[0123456]', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '89885[134]', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '89885[678]', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '898889', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '898894', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '898895[012]', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '898899', direction: 'Россия, мобильные Ростов обл 988', price: '1.8' },
    { pattern: '89893[789]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
    { pattern: '898943[012345]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
    { pattern: '89894[012]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
    { pattern: '89895[012345]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
    { pattern: '89896[123]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
    { pattern: '89897[012]', direction: 'Россия, мобильные Ростов обл 989', price: '1.8' },
  ];


  // Преобразуем tariffs в PriceItem[]
  const prices: PriceItem[] = useMemo(() => {
    return tariffs.map(tariff => {
      // Извлекаем страну из direction (первая часть до запятой)
      const countryMatch = tariff.direction.match(/^([^,]+)/)
      const country = countryMatch ? countryMatch[1].trim() : 'Другие'
      
      // Определяем тип на основе direction
      let type: 'стационарные' | 'мобильные' | 'другие' = 'другие'
      const directionLower = tariff.direction.toLowerCase()
      if (directionLower.includes('стационарные') || directionLower.includes('стационарн')) {
        type = 'стационарные'
      } else if (directionLower.includes('мобильные') || directionLower.includes('мобильн')) {
        type = 'мобильные'
      }

      return {
        number: tariff.pattern,
        direction: tariff.direction,
        price: parseFloat(tariff.price) || 0,
        country: country,
        type: type
      }
    })
  }, [])

  const getRegionByCountry = (country: string): string => {
    const russiaCountries = ['Россия', 'Беларусь', 'Армения', 'Азербайджан', 'Узбекистан', 'Туркменистан', 'Таджикистан']
    const europeCountries = ['Эстония', 'Швеция', 'Швейцария', 'Чехия', 'Хорватия', 'Франция', 'Финляндия', 'Румыния', 'Португалия', 'Польша', 'Германия', 'Испания', 'Италия', 'Великобритания', 'Словения', 'Словакия', 'Сербия и Черногория', 'Австрия']
    const asiaCountries = ['Япония', 'Южная Корея', 'Турция', 'Тайвань']
    const americaCountries = ['США и Канада']

    if (russiaCountries.includes(country)) return 'Россия'
    if (europeCountries.includes(country)) return 'Европа'
    if (asiaCountries.includes(country)) return 'Азия'
    if (americaCountries.includes(country)) return 'Америка'
    return 'Другие'
  }

  const filteredPrices = useMemo(() => {
    return prices.filter(price => {
      const matchesSearch = price.direction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           price.number.includes(searchQuery) ||
                           price.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || price.type === selectedType
      const matchesRegion = selectedRegion === 'all' || getRegionByCountry(price.country) === selectedRegion
      return matchesSearch && matchesType && matchesRegion
    })
  }, [prices, searchQuery, selectedType, selectedRegion])

  return (
    <div className="pricing-table-section">
      <div className="pricing-table-header">
        <h2 className="pricing-table-title">Цены по основным направлениям</h2>
        <p className="pricing-table-subtitle">В рамках договора ИП "Григорян"</p>
      </div>

      <div className="pricing-filters-horizontal">
        <div className="filter-search">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-horizontal"
            />
          </div>
        </div>

        <div className="filter-regions">
          <button
            className={`filter-tab ${selectedRegion === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('all')}
          >
            Все направления
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Россия' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Россия')}
          >
            Россия
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Европа' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Европа')}
          >
            Европа
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Азия' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Азия')}
          >
            Азия
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Америка' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Америка')}
          >
            Америка
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Другие' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Другие')}
          >
            Другие
          </button>
        </div>

        <div className="filter-types">
          <button
            className={`filter-tab ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            Все типы
          </button>
          <button
            className={`filter-tab ${selectedType === 'стационарные' ? 'active' : ''}`}
            onClick={() => setSelectedType('стационарные')}
          >
            Стационарные
          </button>
          <button
            className={`filter-tab ${selectedType === 'мобильные' ? 'active' : ''}`}
            onClick={() => setSelectedType('мобильные')}
          >
            Мобильные
          </button>
          <button
            className={`filter-tab ${selectedType === 'другие' ? 'active' : ''}`}
            onClick={() => setSelectedType('другие')}
          >
            Другие
          </button>
        </div>
      </div>

      <div className="pricing-results">
        <div className="pricing-table-wrapper">
          <table className="pricing-table">
            <thead>
              <tr className="pricing-table-header-row">
                <th className="pricing-table-th">Номер (шаблон)</th>
                <th className="pricing-table-th">Направление</th>
                <th className="pricing-table-th pricing-table-th-right">Цена, руб (без НДС)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices.length > 0 ? (
                filteredPrices.map((price, index) => (
                  <tr
                    key={`${price.number}-${index}`}
                    className="pricing-table-row"
                  >
                    <td className="pricing-table-td pricing-table-td-pattern">
                      {price.number}
                    </td>
                    <td className="pricing-table-td pricing-table-td-direction">
                      {price.direction}
                    </td>
                    <td className="pricing-table-td pricing-table-td-price">
                      {price.price.toFixed(4)} ₽/мин
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="pricing-table-empty">
                    Тарифы не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pricing-results-count">
          Найдено тарифов: <span className="pricing-results-count-number">{filteredPrices.length}</span> из {prices.length}
        </div>
      </div>
    </div>
  )
}

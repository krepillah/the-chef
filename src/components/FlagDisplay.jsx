import { COUNTRY_CODES } from "../config";

const getCountryCode = (countryName) => {
    return COUNTRY_CODES[countryName] || null;
};

export default function FlagDisplay({ countryName }) {
    const countryCode = getCountryCode(countryName);
    return (
        <>
            {countryCode && (
                <span className={`fi fi-${countryCode.toLowerCase()}`}></span>
            )}
        </>
    );
}

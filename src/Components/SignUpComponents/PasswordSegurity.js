function PasswordSegurity({ password }) {
    console.log(password)
  const password_patternHigh = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/; //numero, mayuscula, caracter especial y minimo 8 caracteres
  const password_patternMedium = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/; //numero, mayuscula, caracter especial y minimo 6 caracteres
  const password_patternLow = /^(?=.*\d)(?=.*[A-Z]).{4,}$/; //numero, mayuscula y minimo 4 caracteres

  if (password === undefined || password === null) return null;
  const pwd = typeof password === 'string' ? password : String(password);
  if (pwd.length === 0) return null;
  if (password_patternHigh.test(pwd)) {
    return <div className="h-2 bg-green-600 animate-fill-animeHighPassword"></div>
  } else if (password_patternMedium.test(pwd)) {
    return <div className="h-2 bg-orange-600 animate-fill-animeMediumPassword"></div>
  } else if (password_patternLow.test(pwd)) {
    return <div className="h-2 bg-red-900 animate-fill-animeLowPassword"></div>
  } else {
    return <div className="h-2 bg-red-600 animate-fill-animeDefaultPassword"></div>;
  }
}

export default PasswordSegurity;
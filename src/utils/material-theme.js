import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

const muiTheme = ThemeManager.modifyRawThemePalette(
  ThemeManager.getMuiTheme(LightRawTheme),
  {
    primary1Color: Colors.cyan500,
    accent1Color: Colors.cyan700,
  });

export default muiTheme;

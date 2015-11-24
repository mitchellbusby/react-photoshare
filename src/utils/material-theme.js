import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

const muiTheme = ThemeManager.modifyRawThemePalette(
  ThemeManager.getMuiTheme(LightRawTheme),
  {
    primary1Color: Colors.red500,
    accent1Color: Colors.red500,
  });

export default muiTheme;

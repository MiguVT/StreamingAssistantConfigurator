(async () => {
    const fs = require('fs');
    const ini = require('ini');
    const chalk = require('chalk');
    const readline = require('readline');
    const { execSync } = require('child_process');


    const run = async () => {
        console.log(chalk.yellow('⚠️ This application is not associated with Pico 4 or any other related application. It is a third-party application. ⚠️'));
        console.log(chalk.blue('🎥 Streaming Assistant Configurator - Made by Migu 🎬'));

        let isAdmin = false;
        try {
          execSync('net session >nul 2>&1');
          isAdmin = true;
        } catch (error) {
            console.clear();
            console.log(chalk.red('❌ This application requires administrator privileges to modify the configuration file.'));
            console.log(chalk.red('❌ Please run the application as administrator.'));
            console.log(chalk.yellow('💻 To run the application as administrator, right-click on the application and select "Run as administrator". 💻'));
            setTimeout(() => {
                process.exit(1);
            }, 4000);
        }

        if (isAdmin === true) {

            setTimeout(() => {
                console.clear();
                // Load the INI file
                const config = ini.parse(fs.readFileSync('C:/Program Files/Streaming Assistant/driver/bin/win64/RVRPlugin.ini', 'utf-8'));

                // Create a command line interface to ask the user
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                // Ask the user for the values to modify
                rl.question(chalk.yellow('🔧 Enter the bitrate (default 100000000): '), (bitrate) => {
                    if (!config.codec) config.codec = {};
                    config.codec.bitrate = validateNumberInput(bitrate, '100000000');

                    rl.question(chalk.yellow('🔧 Enter the sharper value (default 0.4): '), (sharper) => {
                        if (!config.PICTURE) config.PICTURE = {};
                        config.PICTURE.sharper = validateNumberInput(sharper, '0.4');

                        rl.question(chalk.yellow('🔧 Enter the bright value (default 1.2): '), (bright) => {
                            config.PICTURE.bright = validateNumberInput(bright, '1.2');

                            rl.question(chalk.yellow('🔧 Enter the saturation value (default 1.1): '), (saturation) => {
                                config.PICTURE.saturation = validateNumberInput(saturation, '1.1');

                                rl.question(chalk.yellow('🔧 Enter the gamma value (default 1.1): '), (gamma) => {
                                    config.PICTURE.gamma = validateNumberInput(gamma, '1.1');

                                    rl.question(chalk.yellow('🔧 Enter the eyeWidth value (default 3072): '), (eyeWidth) => {
                                        config.session.eyeWidth = validateNumberInput(eyeWidth, '3072');

                                        rl.question(chalk.yellow('🔧 Enter the fov value (default 105): '), (fov) => {
                                            config.session.fov = validateNumberInput(fov, '105');

                                            // Write the changes to the INI file
                                            fs.writeFileSync('C:/Program Files/Streaming Assistant/driver/bin/win64/RVRPlugin.ini', ini.stringify(config));

                                            console.log(chalk.green('✅ File updated successfully'));
                                            setTimeout(() => {
                                                rl.close();
                                            }, 4000);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

                function validateNumberInput(input, defaultValue) {
                    if (!input) return defaultValue;

                    const value = parseFloat(input);

                    if (isNaN(value)) {
                        console.error(chalk.red(`❌ Invalid input: ${input} is not a number`));
                        setTimeout(() => {
                            process.exit(1);
                        }, 4000);
                    }

                    return input;
                }
            }, 2000);
        }
    };

    run();
})();

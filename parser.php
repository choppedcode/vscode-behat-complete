<?php

$root = isset($argv[1]) ? $argv[1] : '';

require $root . '/vendor/autoload.php';
require __DIR__ . '/vendor/autoload.php';

function loadBehat($root)
{
    define('BEHAT_BIN_PATH', $root);

    if (is_file($autoload = getcwd() . '/vendor/autoload.php')) {
        require $autoload;
    }

    if (!class_exists('Behat\Behat\ApplicationFactory', true)) {
        if (is_file($autoload = __DIR__ . '/../vendor/autoload.php')) {
            require($autoload);
        } elseif (is_file($autoload = __DIR__ . '/../../../autoload.php')) {
            require($autoload);
        } else {
            fwrite(STDERR,
            'You must set up the project dependencies, run the following commands:'.PHP_EOL.
            'curl -s http://getcomposer.org/installer | php'.PHP_EOL.
            'php composer.phar install'.PHP_EOL
                );
                exit(1);
        }
    }

    $factory = new \Behat\Behat\ApplicationFactory();
    $application = $factory->createApplication();
    $application->getDefinition();
    var_dump($application);
}

loadBehat($root);

// use \BehatParser\Parser;
// use \BehatParser\Matcher;

// $search = isset($argv[2]) ? $argv[2] : '';

// $behat_parser_library = new Parser();

// function getAllClasses() {
//   $classes = get_declared_classes();
//   echo count($classes);
//   exit();
//   foreach ($classes as $class)
//   {
//     if ($ci = class_implements($class)) {
//       echo print_r($ci);
//     }
//   }

//   return [];
// }

// $classes = getAllClasses();

// $behat_parser_library->readClassesForStepDefinitions($classes);

// $matcher = new Matcher($behat_parser_library);
// if (!empty($search)) {
//     $matching_result = $matcher->findStepContaining($search);
// }
// else {
//     $matching_result = $behat_parser_library->getAllStepDefinitions();
// }

// foreach ($matching_result as &$step) {
//     $step = trim(str_replace(['Given', 'When', 'Then', 'But', 'And'], '', $step));
// }
// unset($step);

// $available_steps = array_unique($matching_result);

// echo json_encode($available_steps);

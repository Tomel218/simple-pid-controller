
# PID Controller

This is a fork of https://github.com/hj91/simple-pid-controller

A Proportional-Integral-Derivative (PID) controller is a control loop feedback mechanism widely used in industrial control systems. This module provides a PID controller implementation in Node.js.

## Installation

To install this module, run the following command:

```sh
npm install pid-controller
```

## Usage

First, require the module:

```javascript
const PIDController = require('simple-pid-controller');
```

Then, create a new PIDController instance. You can optionally provide proportional, integral, and derivative gains, as well as a time interval:

```javascript
const controller = new PIDController(1.2, 1, 0.01, 1);
```

You can set a new target for the controller:

```javascript
controller.setTarget(34);
```

And you can update the controller with the current value to get the control output:

```javascript
let power = controller.update(currentValue);
```

## API

This module exports the `PIDController` class, which has the following methods:

- `constructor(k_p = 1.0, k_i = 0.0, k_d = 0.0, i_max = Infinity, i_min = -Infinity, dt = 1.0)`: Constructs a new PIDController. The `i_max` and `i_min` parameters limit the accumulated integral term. The integral term is clamped to the maximum or minimum values to prevent windup.

- `setTarget(target)`: Sets a new target for the controller.

- `update(currentValue)`: Updates the controller with the current value and calculates the control output.

## Parameters

- `k_p`: Proportional gain.
- `k_i`: Integral gain.
- `k_d`: Derivative gain.
- `i_max`: Maximum allowable integral contribution. Prevents the integral from growing indefinitely.
- `i_min`: Minimum allowable integral contribution. Prevents the integral from becoming too negative.
- `dt`: Time interval between updates.

## Applications

PID controllers are used in a wide variety of applications in industrial control systems and other areas, including:

- Controlling the temperature of an oven
- Regulating the speed of a car
- Managing the flight controls of an airplane
- Controlling the power output of a generator

By using this module, developers can implement PID control in their Node.js applications without having to understand all of the underlying mathematics.

## License

This module is licensed under the Apache License.

## Author

Harshad Joshi @ Bufferstack.IO Analytics Technology LLP, Pune
